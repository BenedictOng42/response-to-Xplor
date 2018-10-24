Toy Robot Simulator
===================

Commands to run
--------------
  To install necessary packages
  1. yarn install

  To run application 
  1. yarn start

  To run tests
  1. yarn test

Description
-----------

  - This application uses the Boilerplate: React boilerplate. https://github.com/react-boilerplate/react-boilerplate. It is used instead of a more lightweight boilerplate like create-react-app as I have not yet had experience in using create-react-app.
  - Most of the code is written in the app/containers/HomePage folder.

How to Function
--------------
  - Input is typed in on the Command Input box. 
  - It will accept only one command at a time, in the specific way that was required. 
  
  That is for example:
    1. PLACE 1,2,NORTH
    2. MOVE
    3. LEFT
    4. RIGHT
    5. REPORT

    Note: There is NO space between the commas.

  - It will accept non capitalised versions of the command too such as:
    place 1,2,north
  - To accept a command which has been typed in the input box, simply press the "Enter" key or click the "ADD COMMAND" button.

Extensions
---------

  - This application supports a History feature, recording the exact steps leading to an output.
  - This application also supports displaying failed commands to allow the user to see which commands did not succeed.

Testing
------
  - This application also features test coverage. It is not 100% covered due to time constraints.