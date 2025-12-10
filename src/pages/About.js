import React from "react";
import "./About.css";

function About() {
  return (
    <div>
      <aside class="profile-card">
        <header>
          <a href="/">
            <img
              src="https://image.winudf.com/v2/image/Y29tLm5hbWFuMTQuYWxnb3Zpc3VhbGl6ZXJfaWNvbl8wXzc1YTM4YzA/icon.png?w=&fakeurl=1"
              alt=""
            />
          </a>

          {/* <h1>Veetrag Nahar</h1>
          <h1>Vijay Yadav</h1>
          <h1>Vinay Wakade</h1> */}
          <h1>Prajjwal Verma</h1>

          <h2>Web Developer</h2>

          <p className="profile-bio">
            Sorting Algorithm Visualizer is an interactive tool designed to visually demonstrate how different sorting algorithms work. It provides step-by-step animations of popular algorithms like Bubble Sort, Merge Sort, Quick Sort, and more, helping users understand their logic, efficiency, and behavior through engaging visuals.
          </p>
        </header>

        {/* <div class="profile-bio">
          <p>A react project</p>
        </div> */}
      </aside>
    </div>
  );
}
export default About;
