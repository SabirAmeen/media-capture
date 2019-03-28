import styled from 'styled-components';

const MediaStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

MediaStyled.VideoElement = styled.video`
    width: 400px;
    height: 500px;
    background: black;
    margin: 10px 0;
`;

MediaStyled.Controls = styled.div`
    display: flex;
    justify-content: space-around;
    width: 500px;
    flex-wrap: wrap;
    button {
        margin-top: 10px;
    }
`;

MediaStyled.Canvas = styled.canvas`
    display: none;
`;

export default MediaStyled;