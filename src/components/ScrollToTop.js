import { Button } from "@material-ui/core";

function ScrollToTop() {
  //Get the button:
  // mybutton = document.getElementById("myBtn");

  // // When the user scrolls down 20px from the top of the document, show the button
  // window.onscroll = function() {scrollFunction()};

  // function scrollFunction() {
  //   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //     mybutton.style.display = "block";
  //   } else {
  //     mybutton.style.display = "none";
  //   }
  // }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  return (
    <Button
      style={{
        borderRadius: 55,
        border: "2px solid black",
        fontSize: "8px",
        padding: "8px",
        backgroundColor: "#00B0FF",
        display: "block",
        position: "fixed",
        bottom: "13px",
        left: "9px",
      }}
      onClick={topFunction}
    >
      <img
        width="20"
        src="https://img.icons8.com/material/24/000000/chevron--v1.png"
      />
    </Button>
  );
}
export default ScrollToTop;
