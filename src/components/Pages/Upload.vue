<template>
  <v-container fluid>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="10">
        <v-card
          class="drop-zone"
          outlined
          :style="{ borderColor: $vuetify.theme.themes.dark.borderColor }"
        >
          <v-col
            v-if="!fileName"
            @drop.prevent="onDropFile"
            @dragover.prevent
            :style="{ backgroundColor: $vuetify.theme.themes.dark.background }"
          >
            <div class="text-center">
              <v-card-title
                class="justify-center text-uppercase"
              >
                Drag + Drop
              </v-card-title>
              <v-card-text
                class="justify-center text-center"
              >
                or
              </v-card-text>
              <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                <v-btn
                  text
                  outlined
                  @click="pickFile"
                  class="text-uppercase"
                >Click here</v-btn>
                <!--<v-text-field label="Select File" @click='pickFile' v-model='fileName' prepend-icon='attach_file'></v-text-field>-->
                <input
                  type="file"
                  style="display: none"
                  ref="filename"
                  accept=".pdf"
                  @change="onFilePicked"
                >
              </v-flex>
              <v-card-title
                class="justify-center text-center"
              >
                to {{type}}
              </v-card-title>
            </div>
          </v-col>
          <v-col
            v-else
            class="justify-center align-center"
            :style="{ backgroundColor: $vuetify.theme.themes.dark.background }"
          >
            <div class="text-center">
              <v-card-text>{{fileName}}</v-card-text>
              <v-row class="justify-center">
                <v-btn
                  class="mx-4"
                  @click="cancel"
                  color="background"
                >
                  Cancel
                </v-btn>
                <v-btn
                  class="mx-4"
                  :loading="isUploading"
                  @click="submit"
                  color="background"
                >
                  {{type}}
                </v-btn>
              </v-row>
            </div>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog.show"
      width="500"
    >
      <v-card
        :style="{ backgroundColor: $vuetify.theme.themes.dark.background }"
      >
        <v-card-title
          class="headline grey lighten-2"
          primary-title
          :style="{ backgroundColor: `${$vuetify.theme.themes.dark.background} !important` }"
        >
          {{dialog.title}}
        </v-card-title>

        <v-card-text>
          {{dialog.content}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog.show = false"
          >
            {{dialog.label}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>

  import { mapActions } from 'vuex';
  import Service from '../../api';
  import fs from 'fs';
  import TimeUtil from '../../utils/time';

  export default {
    name: 'Upload',
    props: {
      type: {
        type: String,
        default: '',
      },
      selectedCallback: Function,
    },
    data: () => ({
      dialog: {
        show: false,
        title: '',
        content: '',
        label: 'OK'
      },
      isUploading: false,
      fileName: '',
      fileUrl: '',
      fileData: ''
    }),
    methods: {
      ...mapActions({
        uploadFile: '$_app/uploadFile',
      }),
      pickFile() {
        this.$refs.filename.click();
      },
      initFile() {
        this.fileName = '';
        this.fileData = '';
        this.fileMeta = '';
      },
      prepareFile(file) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        this.fileName = file.name;
        const fr = new FileReader();
        fr.addEventListener('load', () => {
          this.fileData = fr.result;
          this.fileMeta = file;
          console.log('result:', this.fileMeta);
        });
        fr.readAsDataURL(file);
      },
      onDropFile(e) {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          this.prepareFile(files[0]);
        } else {
          this.initFile();
        }
      },
      onFilePicked(e) {
        const files = e.target.files;
        if (files.length > 0) {
          this.prepareFile(files[0]);
        } else {
          this.initFile();
        }
      },
      cancel() {
        this.initFile();
      },
      async pushFile(fileMeta, fileData) {
        await Service.pushFile(fileMeta, fileData);
      },
      async hashFile(file, silent) {
        const hashHex = await Service.getFileHash(file);
        const hashFileInfo = `${file.name}|${hashHex}`;
        const { app } = require('electron').remote;
        const workingDir = `${app.getAppPath()}/hash logs`;
        if (!fs.existsSync(workingDir)){
          fs.mkdirSync(workingDir);
        }
        const fileName = TimeUtil.formatDate(new Date());
        const filePath = `${workingDir}/${fileName}`;
        fs.writeFile(filePath, hashFileInfo, (err) => {
          if (!err) {
            console.log('Hash Saved!');
            if (!silent) {
              this.dialog.title = 'Hash Success!';
              this.dialog.content = hashHex;
              this.dialog.show = true;
            }
          } else {
            console.log('Hash Failed!', err);
          }
        });
      },
      async signFile(meta, file) {
        const {signedStr} = await Service.signFile(file);
        const fileName = `${meta.name}.signed`;

        const { app } = require('electron').remote;
        const workingDir = app.getAppPath();
        if (!fs.existsSync(workingDir)){
          fs.mkdirSync(workingDir);
        }

        const signedFile = new File([signedStr], fileName, {
          type: meta.type,
          lastModified: new Date()
        });

        const uploadResult = await Service.uploadToWasabi(signedFile).catch(err => err);
        if (typeof uploadResult === 'string' && uploadResult.toString() === 'Error!') {
          return;
        }

        const { dialog } = require('electron').remote;
        const filePath = await new Promise((resolve, reject) => dialog.showSaveDialog({
          title: 'Save Signed File',
          defaultPath: `*/${fileName}`,
        }, (path) => {
          if (path) {
            resolve(path);
          } else {
            reject();
          }
        }));
        if (filePath) {
          await new Promise((resolve, reject) => fs.writeFile(filePath, signedStr, (err) => {
            if (!err) {
              console.log('success!', signedStr, require('path').dirname(meta.path));
              resolve();
            } else {
              reject();
            }
          }));
        }
      },
      async submit() {
        if (!this.fileMeta || this.fileData === '') return;

        this.isUploading = true;

        try {
          if (this.type === 'hash and upload') {
            await this.hashFile(this.fileData, true);
            await this.uploadFile(this.fileMeta).catch(err => err);
          } else if (this.type === 'hash') {
            await this.hashFile(this.fileData);
          } else if (this.type === 'sign') {
            await this.signFile(this.fileMeta, this.fileData);
          } else if (this.type === 'upload') {
            await this.uploadFile(this.fileMeta);
          } else if (this.type === 'push') {
            await this.pushFile(this.fileMeta, this.fileData);
          }
        } catch (e) {
          console.log('error:', e);
        }

        this.isUploading = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .drop-zone {
    &.v-card {
      border-style: dashed;
    }
  }
</style>