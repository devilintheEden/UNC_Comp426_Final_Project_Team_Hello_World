function UserProfile() {
    return(
        <article class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
          <h1 class="f3 tc">Profile</h1>
          <div class="tc">
            <img src="https://placeholder.pics/svg/100x100" class="br-100 h3 w3 dib" title="Profile picture"></img>
              <h1 class="f4">First Last</h1>
                <hr class="mw3 bb bw1 b--black-10"></hr>
          </div>
          <p class="lh-copy measure center f6 black-70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        <div class="flex items-center justify-center pa1">
          <a href="#" class="f6 no-underline black bg-animate hover-bg-light-blue hover-white inline-flex items-center pa2 ba border-box br3 mr4">
            <span class="tc">Settings</span>
          </a>
          <a href="#" class="f6 no-underline black bg-animate hover-bg-light-blue hover-white inline-flex items-center pa2 ba border-box br3">
            <span class="tc">Logout</span>
          </a>
        </div>

      </article>
    );
}

export default UserProfile;