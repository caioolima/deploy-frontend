// modalStyles.js

const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      borderRadius: "12px",
      maxWidth: "90%", // Define a largura máxima como uma porcentagem
      maxHeight: "90%", // Define a altura máxima como uma porcentagem
      overflow: "auto", // Permite rolagem se o conteúdo exceder o tamanho do modal
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  
  export default modalStyles;
  