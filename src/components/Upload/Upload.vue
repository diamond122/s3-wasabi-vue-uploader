<template>
  <v-container fluid>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="10">
        <v-card class="drop-zone" outlined>
          <v-col
            v-if="!fileName"
            @drop.prevent="onDropFile"
            @dragover.prevent
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
                to upload
              </v-card-title>
            </div>
          </v-col>
          <v-col v-else class="justify-center align-center">
            <div class="text-center">
              <v-card-text>{{fileName}}</v-card-text>
              <v-row class="justify-center">
                <v-btn
                  class="mx-4"
                  @click="cancel"
                >
                  Cancel
                </v-btn>
                <v-btn
                  class="mx-4"
                  :loading="isUploading"
                  @click="submit"
                >
                  Upload
                </v-btn>
              </v-row>
            </div>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

  import { mapActions } from 'vuex';

  export default {
    name: 'Upload',
    props: {
      selectedCallback: Function,
    },
    data: () => ({
      dialog: false,
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
        fr.readAsDataURL(file);
        fr.addEventListener('load', () => {
          this.fileData = fr.result;
          this.fileMeta = file;
        })
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
      async submit() {
        if (!this.fileMeta || this.fileData === '') return;

        this.isUploading = true;

        await this.uploadFile(this.fileMeta);

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