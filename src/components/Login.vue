<template>
  <v-sheet max-width="500" class="mx-auto pa-12">
    <v-card elevation="5" class="pa-4">
      <h1 class="d-flex justify-center">Login</h1>
      <v-form @submit.prevent="login" ref="form">
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Enter Your Username"
          type="text"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
          required
        ></v-text-field>

        <div>
          <video ref="video" width="370" @canplay="initCanvas()">
            Stream Unavailable
          </video>
          <canvas ref="canvas" style="display: none" />
        </div>

        <v-btn
          type="submit"
          block
          class="mt-2"
          color="indigo"
          text="Submit"
        ></v-btn>
      </v-form>
    </v-card>
  </v-sheet>
  <div>
    <img :src="imageData" alt="image" />
  </div>
</template>
    
  <script>
export default {
  name: "Login",

  components: {},

  data() {
    return {
      username: "",
      password: "",
      passwordRules: [
        (value) => !!value || "Name is required",
        (value) =>
          (value && value.length >= 8) ||
          "Password must be less than 20 characters",
      ],
      usernameRules: [
        (value) => !!value || "username is required",
      ],
      video: null,
      canvas: null,
      imageData: null, // Added to store captured image data
    };
  },
  mounted() {
    this.video = this.$refs.video;
    this.canvas = this.$refs.canvas;
    this.startCapture();
  },
  methods: {
    startCapture() {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.play();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    initCanvas() {
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
    },
    async login() {
      try {
        let context = this.canvas.getContext("2d");

        context.drawImage(
          this.video,
          0,
          0,
          this.video.videoWidth,
          this.video.videoHeight
        );
        // Save the captured image data
        this.imageData = this.canvas.toDataURL("image/png");

        console.log(this.imageData);

        // Pause the video stream
        this.video.pause();

        // Stop all tracks of the video stream
        let tracks = this.video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());

        await this.$store.dispatch("login", {
          username: this.username,
          password: this.password,
        });

        this.$router.push({ name: "dashboard" });
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    },
  },
};
</script>
    
  <style scoped>
</style>
  