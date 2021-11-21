### Slide 1:

I want to thank JAWS for inviting me to speak with you today.

I'm using this Pocketalk translator for this talk, so I may end up speaking unusually slow, hopefully the translation comes through okay.

So, I've been in the tech space for 15 years.  Today I advise companies on how best to leverage cloud services to build faster with higher quality.

Tool overload is a real thing.  We're only just starting to find traction with one infrastructure as code tool before someone is trying to pitch us the next big thing.  So let me pitch you CDK.

A year ago, I had been avoiding CDK despite people telling me it's a game changer.

Like many, I had believed that infrastructure as code should be done in a declarative language.

Having now worked with CDK for a year, it's my go to tool for building anything on AWS.

In the interest of time, I'm going to quickly kick off a deployment of a CDK app and then we'll come back to it a bit later.

Hang tight while I switch between screens.

---

### Slide 2:

From the AWS website, CDK is defined as "an open source software development framework to define your cloud application resources using familiar programming languages."

Why would you want to take a heavy language such as Java and use it to define infrastructure configuration?

Hopefully by the end of this presentation, that question will be answered in your mind.

---

### Slide 3:

The way CDK works, is you define your infrastructure in the language of your choice and it synthesizes CloudFormation code. 

CDK supports using TypeScript or JavaScript, Python, Java, .NET, and even GoLang.

---

### Slide 4:

The way they make this possible is by using an open-source technology called JSII.

JSII allows code in any language to naturally interact with JavaScript classes.  

This is a concrete example of how AWS is meeting developers where they are, to make their lives easier.

---

### Slide 5:

Traditionally, if you were building a serverless application using CloudFormation you'd end up with a huge CloudFormation template file similar to what's shown here.

I like the fact that by writing raw CloudFormation, it forces you to read through the documentation for AWS resources.

This gives you a comprehensive exposure to the features you could leverage.

Unfortunately it's not very conducive to high velocity development.

In many cases, common patterns emerge for how to configure AWS services and how to integrate them that apply across applications you might build.

This means the added verbosity is often wasted effort and time.

---

### Slide 6:

This problem is an area where CDK shines.

(Circle Constructs)
CDK has this concept of constructs that can exist at different levels based on the amount of opinionation and whether they represent a single AWS resource or multiple.

There are three levels of constructs.  Level 1, Level 2, and Level 3.

Level 1 constructs in CDK represent the unabstracted CloudFormation resources.

Level 2 constructs are what you'd typically be working with in CDK.

If you're familiar with AWS SAM - the Serverless Application Model.

Level 2 constructs are doing something similar. However, CDK is doing this abstraction at a much larger scale across way more AWS resources.

Lastly, the Level 3 constructs represent common deployment patterns involving multiple connected AWS services, these patterned constructs can be found seperately in the aws-constructs-library.

I'm going to focus on constructs and cdk-pipelines in this presentation, but let me first touch on a couple other advantages that I think are worth mentioning.

A major advantage of CDK is that it was made generally available and is maintained directly by AWS.

This means that new AWS services and features are supported very quickly after release.

You can also have confidence that the higher level constructs follow well-architected best practices.

The AWS Serverless Application Model CLI has a beta release that allows you locally to test Lambda function code natively in CDK.

---

### Slide 7:

An example of a Level 3 construct is shown here.

In just a few lines of code, the aws-cloudfront-s3 construct allows you to deploy a fully functioning static hosting solution using CloudFront and S3. 

Where as in CloudFormation you'd have to write something looking like the code dragging down the back of this slide.

Lastly, cdk-pipelines which is a newer part of AWS CDK, gives you a super simple way to get a CI/CD pipeline up and running.

Allowing you to automate deployment of your CDK apps straight from your source code repository.

---

### Slide 8:

Our demo today will cover a very simple, yet powerful, CDK application that deploys a serverless IP Geolocation API.

This solution will leverage API Gateway Version 2, AWS Lambda, and MaxMind's free embeddable GeoLite2 City database to quickly find where an IP address is located.

We'll also be using cdk-pipelines to deploy this application.

Hang tight while I switch screens.

(Open VSCode)
The CDK sample app that I'll be using in this presentation was written in TypeScript.

As mentioned earlier this could easily be re-implemented in the other languages supported by CDK.

I've already cloned this repository locally and installed the node dependencies, at the beginning presentation I also ran a deployment.

- Explain IAM warning.
- Open lib stack file
- Lambda function, using level 2 construct.
- Bundling configuration
	-> esbuild or docker
	-> Allows you to really easily write your Lambda function code in TS
- API Gateway configuration
- Lambda function code simple.
- cdk-pipeline
- Run curl with Google IP.

---

### Slide 9:

Before I let you go, if you're interested in digging deeper into why CDK is a game changer I encourage you to check out these resources.

First would be to check out cdkworkshop.com, they have some really awesome tutorials to get you started.

---

### Slide 10:

Second would be to check out a project called projen.

It makes the scaffolding of CDK Apps so much easier and allows you to quickly get a well formed project structure from the start.

---

### Slide 11:

"The CDK Book" while it hasn't been released yet, is being written by some of the AWS Hero's who are very active using and/or contributing to the open-source CDK project.

One of the authors Sathya actually presented here a few hours ago.

---

### Slide 12:

I've also open-sourced a number of CDK sample applications including the one in this demo on Github, I encourage you to check them out and I hope they can provide you value.

I'm not an expert in CDK by any stretch, but I have been using it fairly extensively for the past year and feel free to reach out with any questions.

Thanks everyone for your time, and I hope you've found value in this presentation.