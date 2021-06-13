function formatNumberWithSpaces (number) {
   try{
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
   }
   catch(TypeError){
      console.log("TypeError raised in formatNumberWithSpaces");
      return 0;
   }
};

export default formatNumberWithSpaces;