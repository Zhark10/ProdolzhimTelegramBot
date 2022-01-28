export const getHtmlTemplateForSimpleMessage = (message) => {
  const colors = {
    primary: '#000000',
    secondary: '#ffff00'
  }
  return `
    <body style="
      margin: 0; 
      width: 360; 
      height: 96;
      background-color: ${colors.secondary};
      font-family: Courier New;
    ">
      <div style="
        position: fixed;
        height: 520px;
        width: 520px;
        border: 150px solid rgba(0,0,0,0.08);
        top: -80px;
        left: 0;
        border-radius: 50%;
      "></div>
      <div style=" 
        display: flex; 
        align-items: center; 
        height: 96;
        font-size: 16px;
        color: ${colors.primary};
        text-align: center;
      ">
          ${message}
      </div>
    </body>`
}