<template>
<div class="absolute mt-2 ml-[10px] w-[130px] z-10 h-[100px] bg-cover bg-center" style="background-image: url('/assets/gJW40PvAOx16R44UE4-ezgif.com-video-to-gif-converter.gif');"></div>
  <div class="relative max-w-10xl mx-auto w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10 form-container tuning-calculator">
    <h2 class="text-3xl font-bold mb-6 text-center">Guitar Tuner</h2>
    <section class="border-2 border-dashed p-5 border-gray-400  rounded-xl">
    <div class="mb-6">
      <label for="tuning" class="block text-sm font-medium text-gray-700">Select Tuning</label>
      <select
        id="tuning"
        v-model="selectedTuning"
        class="mt-1 block w-full bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 rounded-lg h-10 px-2 md:w-full"
      >
        <option value="standard">Standard EADGBE</option>
        <option value="dropD">Drop D (DADGBE)</option>
        <option value="halfStepDown">Half Step Down (Eb Ab Db Gb Bb Eb)</option>
      </select>
    </div>
    
    <section class="border-2 border-dashed border-gray-400 p-5 rounded-xl custom-blur">
      <div class="tuning-display">
        <h3 class="text-lg font-medium flex justify-center">Current Tuning</h3>
        <ul class="space-y-3 p-9">
          <li v-for="(note, index) in guitarStrings" :key="index" class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 gap-4 sm:gap-10">
            <span class="font-semibold sm:w-1/3">{{ index + 1 }} String:</span>
            <span class="font-bold bg-orange-400 rounded-xl w-20 text-center py-2 sm:w-20 sm:py-3 mr-60">{{ note }}</span>
            <button @click="toggleStringMicrophone(index)" class="mt-3 sm:mt-0 bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 rounded-lg sm:w-auto">
              {{ isMicrophoneOn[index] ? 'Turn Off' : 'Turn On' }} Mic
            </button>
          </li>
        </ul>
      </div>
    </section>

    
    <section class="border-2 border-dashed border-gray-400 p-5 mt-5 rounded-xl custom-blur">
      <div class="current-note-display mt-4 flex justify-center items-center text-center">
        <p>{{ detectedNote }}</p>
      </div>

      <div class="graph flex flex-col items-center justify-center">
          <h3 class="text-lg font-medium text-center">Tuning Graph</h3>

          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 mt-10">
            <div v-for="(note, index) in guitarStrings" :key="index" class="flex flex-col items-center">
              <div :class="getGraphClass(index)" class="h-20 w-28 sm:h-24 sm:w-32 md:h-32 md:w-40 border-2 border-gray-500 rounded-lg flex items-end justify-center">
                <span class="text-3xl pb-4 font-serif">{{ frequencies[index].toFixed(1) }}</span>
              </div>
              <span class="text-sm mt-2 sm:text-base">String {{ index + 1 }}</span>
            </div>
          </div>
        </div>


              <div class="string-indicator mt-4 justify-center items-center text-center">
                <h3 class="text-lg font-medium pt-5">Tuning Status</h3>
                <div class="flex flex-wrap gap-4 mt-8">
          <p v-for="(status, index) in tuningStatus" :key="index" class="bg-orange-200 px-3 py-2 rounded-lg">
            String {{ index + 1 }}: {{ status }}
          </p>
        </div>

        <p v-if="allStringsTuned" class="text-green-600 font-bold mt-4">
          All Strings Done Tuning! Final frequencies saved.
        </p>
      </div>
    </section>

  </section>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      selectedTuning: 'standard',
      guitarStrings: ['E', 'A', 'D', 'G', 'B', 'E'],
      targetFrequencies: {
        'E': 82.41,
        'A': 110.00,
        'D': 146.83,
        'G': 196.00,
        'B': 246.94,
        'E_high': 329.63,
        'Eb': 77.78,
        'Ab': 103.83,
        'Db': 138.59,
        'Gb': 185.00,
        'Bb': 233.08
      },
      frequencies: [0, 0, 0, 0, 0, 0],
      tuningStatus: ['Not tuned', 'Not tuned', 'Not tuned', 'Not tuned', 'Not tuned', 'Not tuned'],
      stringsTuned: [false, false, false, false, false, false],
      audioContexts: [],
      analysers: [],
      microphones: [],
      tuningThreshold: 2,
      isMicrophoneOn: [false, false, false, false, false, false],
      detectedNote: '',
    };
  },
  computed: {
    allStringsTuned() {
      return this.stringsTuned.every(status => status);
    }
  },
  methods: {
    startTuning(index) {
      if (!this.audioContexts[index]) {
        this.audioContexts[index] = new (window.AudioContext || window.webkitAudioContext)();
        this.analysers[index] = this.audioContexts[index].createAnalyser();
        this.analysers[index].fftSize = 2048;
      }

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          this.microphones[index] = this.audioContexts[index].createMediaStreamSource(stream);
          this.microphones[index].connect(this.analysers[index]);
          this.analyseAudio(index);
        })
        .catch((err) => {
          console.error('Error accessing microphone for string', index, err);
        });
    },

    stopTuning(index) {
      if (this.microphones[index]) {
        this.microphones[index].disconnect();
        if (this.tuningStatus[index] === 'In tune!') {
          this.stringsTuned[index] = true;
        }
      }
      if (this.audioContexts[index]) {
        this.audioContexts[index].close();
        this.audioContexts[index] = null;
      }
      this.isMicrophoneOn[index] = false;
    },

    toggleStringMicrophone(index) {
      if (this.isMicrophoneOn[index]) {
        this.stopTuning(index);
      } else {
        this.startTuning(index);
        this.isMicrophoneOn[index] = true;
      }
    },

    analyseAudio(index) {
      const analyser = this.analysers[index];
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);
      
      const updatePitch = () => {
        if (!this.isMicrophoneOn[index]) return;
        
        analyser.getFloatTimeDomainData(dataArray);
        const frequency = this.autoCorrelate(dataArray, this.audioContexts[index].sampleRate);
        
        if (frequency !== -1) {
          this.frequencies[index] = frequency;
          this.checkTuning(index, frequency);
        }
        
        requestAnimationFrame(updatePitch);
      };
      
      updatePitch();
    },

    autoCorrelate(buffer, sampleRate) {
      const SIZE = buffer.length;
      const MAX_SAMPLES = Math.floor(SIZE/2);
      let bestOffset = -1;
      let bestCorrelation = 0;
      let rms = 0;
      let foundGoodCorrelation = false;
      
      for (let i = 0; i < SIZE; i++) {
        const val = buffer[i];
        rms += val * val;
      }
      rms = Math.sqrt(rms/SIZE);
      
      if (rms < 0.01) return -1;
      
      let lastCorrelation = 1;
      
      for (let offset = 0; offset < MAX_SAMPLES; offset++) {
        let correlation = 0;
        
        for (let i = 0; i < MAX_SAMPLES; i++) {
          correlation += Math.abs((buffer[i]) - (buffer[i + offset]));
        }
        
        correlation = 1 - (correlation/MAX_SAMPLES);
        if (correlation > 0.9 && correlation > lastCorrelation) {
          foundGoodCorrelation = true;
          if (correlation > bestCorrelation) {
            bestCorrelation = correlation;
            bestOffset = offset;
          }
        } else if (foundGoodCorrelation) {
          let shift = (this.correlationShift(buffer, SIZE, bestOffset) - bestOffset);
          return sampleRate/(bestOffset + (8 * shift));
        }
        lastCorrelation = correlation;
      }
      
      if (bestCorrelation > 0.01) {
        return sampleRate/bestOffset;
      }
      return -1;
    },

    correlationShift(buffer, SIZE, bestOffset) {
      let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
      
      for (let i = 0; i < SIZE; i++) {
        const x = buffer[i];
        const y = buffer[i + bestOffset] || 0;
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumXX += x * x;
      }
      
      const numerator = SIZE * sumXY - sumX * sumY;
      const denominator = SIZE * sumXX - sumX * sumX;
      return denominator !== 0 ? numerator/denominator : 0;
    },

    checkTuning(index, frequency) {
      const targetNote = this.guitarStrings[index];
      const targetFreq = this.targetFrequencies[targetNote === 'E' && index === 5 ? 'E_high' : targetNote];
      const percentDiff = Math.abs((frequency - targetFreq) / targetFreq) * 100;

      if (percentDiff <= this.tuningThreshold) {
        this.tuningStatus[index] = 'In tune!';
      } else if (frequency < targetFreq) {
        this.tuningStatus[index] = 'Too low';
      } else {
        this.tuningStatus[index] = 'Too high';
      }
    },

    getGraphClass(index) {
      return this.stringsTuned[index] || this.tuningStatus[index] === 'In tune!' ? 'bg-green-500' : 'bg-red-500';
    }
  },
  watch: {
    selectedTuning(newTuning) {
      switch (newTuning) {
        case 'standard':
          this.guitarStrings = ['E', 'A', 'D', 'G', 'B', 'E'];
          break;
        case 'dropD':
          this.guitarStrings = ['D', 'A', 'D', 'G', 'B', 'E'];
          break;
        case 'halfStepDown':
          this.guitarStrings = ['Eb', 'Ab', 'Db', 'Gb', 'Bb', 'Eb'];
          break;
        default:
          this.guitarStrings = ['E', 'A', 'D', 'G', 'B', 'E'];
      }
      // Reset all tuning states
      this.tuningStatus = this.guitarStrings.map(() => 'Not tuned');
      this.frequencies = this.guitarStrings.map(() => 0);
      this.stringsTuned = this.guitarStrings.map(() => false);
    },
  },
};
</script>

<style scoped>
.form-container {
  position: relative;
  background-color: white;
  border-radius: 0.75rem;
  padding: 2.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1;
}

.form-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('src/assets/0T194mqZLZ28ePJtHR-ezgif.com-video-to-gif-converter.gif');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.2;
  z-index: -1;
  border-radius: inherit;
}
.custom-blur {
  background: rgba(183, 183, 183, 0.3);
  backdrop-filter: blur; 
  -webkit-backdrop-filter: blur(1px); 
}
.microphone-control button {
  background-color: #1D4ED8;
  color: white;
  padding: 12px 24px;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.microphone-control button:hover {
  background-color: #2563EB;
}
</style>