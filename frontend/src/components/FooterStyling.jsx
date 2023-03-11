import styled from "styled-components"

export const FooterBox = styled.div`
    padding: 6rem 0px 60px 0px;
    background: #2B2D42; 
    position: relative;
    
    @media (max-width: 1100px) {
      position: relative;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1100px;
    margin: 0 auto;
`;
   
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;

`;
   
export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
  }
`;
   
export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 5px;
  font-size: 18px;
  text-decoration: none;
   
  &:hover {
      color: green;
      transition: 200ms ease-in;
  }
`;
   
export const Heading = styled.p`
  font-size: 16px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: bold;
`;