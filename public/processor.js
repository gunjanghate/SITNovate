class MyProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
    }
  
    process(inputs, outputs, parameters) {
      const input = inputs[0]; // Get input audio
      if (input.length > 0) {
        const channelData = input[0]; // Get first audio channel
        this.port.postMessage(channelData); // Send data to main thread
      }
      return true; // Keep processor running
    }
  }
  
  registerProcessor('my-processor', MyProcessor);
  