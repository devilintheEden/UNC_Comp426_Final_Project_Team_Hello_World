# UNC_Comp426_Final_Project_Team_Hello_World

**Deploy File See Deploy Branch**

API Introduction Markdown: https://github.com/devilintheEden/UNC_Comp426_Final_Project_Team_Hello_World/blob/header/NextJS/API.markdown

11.2.2020 Sign Up/Log in with email with verification code with MongoDB (+ header/footer)

10.14.2020 Use CSS framework **Tachyons**, first UI with uploaded image show, full TTF download supported 

10.03.2020 - nextjs app providing sample pdf downloading with input validation

To run the project, make sure that you have node and npm install. Then download the sample project via

```
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"
```

go to the `nextjs-blog` directory and copying the content in folder NextJS from this repo, adding the components folder and replacing the original pages, public folders and package.json file. Then run 

`npm install` under the `nextjs-blog` directory to download the dependencies.

If you only want a demo and don't want to install all the python backend dependencies, there is also a dummy python file for this purpose. Switch line 34 and 35 in `components/DownloadForm.js` as well as line 6 and 7 in `pages/api/download.js` , in this case, the page will download a text file without extra dependencies ( you still need to have python3 installed)

If you want to run the full project you need to run `pip3 install pillow, pdf2image`. `pdf2image` may have extra dependencies based on your platform, with detailed information here -> https://pypi.org/project/pdf2image/.

For future local debugging, you might also want to install potrace (http://potrace.sourceforge.net/#downloading) and python-fontforge (https://fontforge.org/docs/scripting/python/fontforge.html) (you may want to comment out line 4 of `public/generate_ttf_related.py` if you are not installing fontforge now).

I highly recommend using **Ubuntu** as your develop platform. For windows, simply install **Ubuntu on Windows** in Microsoft Store. For mac, you can choose to use a virtual machine or you can try to work around the dependencies with something like **brew**. If you are using **Ubuntu**, I have a set of exact instructions on how to get the environment set under the folder `documents`.

Try to read through the code and learn more about React components.  Practice writing a component that give an alert \<div> section that are inserted at the end of the form every time an invalid character is entered and removed otherwise. Now it is simply an unpolished alert() function.

