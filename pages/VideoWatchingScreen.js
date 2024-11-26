import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider'; // Make sure to install this package
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5

const VideoWatchingScreen = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isReplaying, setIsReplaying] = useState(false);
  const [duration, setDuration] = useState(0); // Total duration of the video
  const [currentTime, setCurrentTime] = useState(0); // Current playback position
  const videoRef = useRef(null);

  useEffect(() => {
    loadFullVideo();
  }, [videoId]);

  const loadFullVideo = async () => {
    try {
      // const response = await fetch(`https://your-backend.com/videos/${videoId}/full`);
      // const data = await response.json();
      // setVideoUrl(data.fullUrl);
      setVideoUrl('https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4');

    } catch (error) {
      console.error("Failed to load full video:", error);
    }
  };

  const handleVideoEnd = () => {
    setIsReplaying(true);
    videoRef.current.seek(0); // Restart from the beginning
  };

  const handleReplayEnd = () => {
    setIsReplaying(false);
  };

  const handleLoad = (meta) => {
    setDuration(meta.duration); // Set total duration when video loads
  };

  const handleProgress = (progress) => {
    setCurrentTime(progress.currentTime); // Update current time as video progresses
  };

  const handleSeek = (value) => {
    videoRef.current.seek(value);
    setCurrentTime(value); // Update current time after seeking
  };

  return (
    <View style={styles.container}>
      {videoUrl && (
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={styles.video}
          resizeMode="contain"
          onEnd={isReplaying ? handleReplayEnd : handleVideoEnd}
          onLoad={handleLoad} // Called when video is loaded to get duration
          onProgress={handleProgress} // Called while video is playing to get current time
          repeat={isReplaying} // Repeat when video ends
        />
      )}

      {/* Timeline Slider */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        onSlidingComplete={handleSeek} // Called when user stops dragging the slider
        minimumTrackTintColor="#f44b87"
        maximumTrackTintColor="#fbc8da"
        thumbTintColor="#00000000"
      />

      {/* Overlay UI Elements */}

      {/* Right Side  */}

      <View style={styles.rightSide}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="heart" size={25} color="white" solid />
          <Text style={styles.iconText}>72,1 N</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="comment-dots" size={25} color="white" solid />
          <Text style={styles.iconText}>370</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="comment-dots" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Footer  */}
      <View style={styles.footer}>
        <Text style={styles.profileName}>Laura</Text>
        
        <Text style={{color: 'white', marginLeft: 4}}>Đây là clip về con thỏ chui khỏi hang</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <TouchableOpacity>
            <Text style={styles.iconText}>#19.6k</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.iconText}>#700</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.iconText}>#19.6k</Text>
          </TouchableOpacity>
        </View>
      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  slider: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
  },
  rightSide: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  footer: {
    position: 'absolute',
    width: '80%',
    bottom: 30,
    left: 16,
  },
  profileName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  iconButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default VideoWatchingScreen;
