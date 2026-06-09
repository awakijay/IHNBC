import YoutubePlayer from 'react-native-youtube-iframe';

type YoutubeEmbedProps = {
  height: number;
  play: boolean;
  title: string;
  videoId: string;
};

export function YoutubeEmbed({ height, play, videoId }: YoutubeEmbedProps) {
  return (
    <YoutubePlayer
      height={height}
      play={play}
      videoId={videoId}
      webViewStyle={{ backgroundColor: '#111111' }}
    />
  );
}
