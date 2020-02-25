## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your Team Lead.

- [ ] Mention two parts of Express that you learned about this week.

    1. Express is a framework that makes node.js easier to use, similar to react and javascript.
    
    2. Express uses the http server modules provided by node.js and adds/allows for extra middleware support
    and routing

- [ ] Describe Middleware?

    --> Middleware is an array of functions that allows you to manage the flow of data/change it and 
    helps tremendously with cleaning up code and keeping things DRY

    --> Middleware is executed in the order it is introduced

- [ ] Describe a Resource?

    --> API Data

- [ ] What can the API return to help clients know if a request was successful?

    --> res.status(200)

- [ ] How can we partition our application into sub-applications?

        --> By routing! you can route your sub apps to index.js so they come together