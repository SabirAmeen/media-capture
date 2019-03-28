import React from 'react';
import { detectUserMedia } from '../../../../services/detectFeature';
import Button from '@material-ui/core/Button';
import MediaStyled from './styled';

export default class UserMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stream: null,
            recording: false,
            screenShot: null,
        }
        this.videoRef = React.createRef();
        this.canvasRef = React.createRef();
        this.imageRef = React.createRef();
        this.constraints = {
            video: true,
            audio: true,
        }
        this.recordedBlobs = [];
        this.options = {
            mimeType: 'video/webm;codecs=vp8',
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 128000,
            bitsPerSecond: 128000,
          };
    }

    getVideoStream = () => {
        if (detectUserMedia()) {
            return navigator.mediaDevices.getUserMedia(this.constraints)
                .then((stream) => {
                    this.videoRef.current.srcObject = stream;
                    this.setState({ stream })
                    return stream;
                })
        }
    }

    stopVideoStream = () => {
        const { stream } = this.state;
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
            track.stop();
        })
        this.setState({ stream: null })
    }

    getMediaSources = () => {
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                console.log(devices)
            })
    }

    handleDataAvailable = (event) => {
        if (event.data && event.data.size > 0) {
            this.recordedBlobs.push(event.data);
        }
    }

    startRecording = async () => {
        const stream = await this.getVideoStream();
        this.mediaRecorder = new MediaRecorder(stream, this.options);
        this.mediaRecorder.ondataavailable = this.handleDataAvailable;
        this.mediaRecorder.start(100);
        this.setState({ recording: true })
    }

    stopRecording = () => {
        this.stopVideoStream();
        const superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
        const videoSrc = window.URL.createObjectURL(superBuffer);
        const link = document.createElement('a')
        link.setAttribute('download','video.mp4');
        link.href=videoSrc;
        link.click();
        this.setState({ recording: false })
    }

    takeScreenshot = () => {
        const canvas = this.canvasRef.current;
        const video = this.videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        // Other browsers will fall back to image/png
        this.setState({ screenShot: canvas.toDataURL('image/webp') })
    }

    render() {
        const { recording, stream, screenShot } = this.state;
        return (
            <MediaStyled>
                <MediaStyled.VideoElement autoPlay ref={this.videoRef} muted />
                <MediaStyled.Controls>
                    <Button variant="contained" onClick={this.getVideoStream} disabled={Boolean(stream)}>
                        get video Stream
                    </Button>
                    <Button variant="contained" onClick={this.stopVideoStream} disabled={!Boolean(stream)}>
                        stop video Stream
                    </Button>
                    <Button variant="contained" onClick={this.getMediaSources}>
                        get media sources
                    </Button>
                    <Button variant="contained" onClick={this.startRecording} disabled={recording}>
                        Start recording
                    </Button>
                    <Button variant="contained" onClick={this.stopRecording} disabled={!recording}>
                        stop recording
                    </Button>
                    <Button variant="contained" onClick={this.takeScreenshot} disabled={!Boolean(stream)}>
                        Take screenshot
                    </Button>
                </MediaStyled.Controls>
                <MediaStyled.Canvas ref={this.canvasRef} />
                {
                    screenShot ?
                        <img alt="for screenshots" src={screenShot} />
                    : null
                }
            </MediaStyled>
        )
    }
}