

import React, {useState} from 'react';
import PropTypes from 'prop-types';


export default function TextForm(props) {

    const handleUpClick = () => {
    // console.log("Uppercase was clicked");
    setText("You have clicked on handleUpClick");
    let a=text.toUpperCase();
    setText(a);
    }

    const handleOnChange = (event) => {
    //console.log("On Change");
    setText(event.target.value);
    
    }

    const [text, setText] = useState("");

    // text = "new text"; // Wrong way to change the state
    // setText("new text"); // Correct way to change the state
    //or i can send the text to the backend server and get the string and run
    //the string in the settext function to change the state

    return (
          <>  
        <div className="container" >
            <h1>{props.heading}</h1>
            <div className="mb-3">
                <textarea className="form-control" value={text} onChange={handleOnChange} id="exampleFormControlTextarea1" rows="10"></textarea>
            </div>
            <button className="btn btn-primary" onClick={handleUpClick}>Convert to Uppercase</button>
             
        </div>
        <div className="container my-3 ">
            <h1> Checking...   </h1>
            <p>Text summary </p>
            <p>The length of the text is {text.length}</p>
            <p>The number of words are {text.split(" ").length}</p>
            <p>Time to read {0.008*text.split(" ").length} minutes</p>
         
        </div>
        </>
    )
    //send the text to the backend server and get the string and run


}
