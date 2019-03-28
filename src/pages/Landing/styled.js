import styled from 'styled-components';

const LandingStyled = styled.section`
    width: 100%;
`;

LandingStyled.Content = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    height: calc(100% - 50px);
`;

LandingStyled.LinkWrapper = styled.section`
    padding: 50px;
`;

export default LandingStyled;