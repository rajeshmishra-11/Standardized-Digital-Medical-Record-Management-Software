import DownloadButton from '../DownloadButton';

export default function DownloadButtonExample() {
  return (
    <DownloadButton 
      onDownload={(format) => console.log('Download:', format)}
    />
  );
}
