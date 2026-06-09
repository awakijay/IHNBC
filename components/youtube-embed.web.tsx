import { createElement } from 'react';

type YoutubeEmbedProps = {
  height: number;
  play: boolean;
  title: string;
  videoId: string;
};

export function YoutubeEmbed({ height, play, title, videoId }: YoutubeEmbedProps) {
  const autoplay = play ? 1 : 0;

  return createElement('iframe', {
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    allowFullScreen: true,
    src: `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&playsinline=1&rel=0`,
    style: {
      borderWidth: 0,
      height,
      width: '100%',
    },
    title,
  });
}
