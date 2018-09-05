# oysterpy
Proof-of-concept Python implementation of client-side logic for rev2 of the Oyster Protocol

This library is basically here as reference for other devs working on the actual JS client, to help them implement rev2 changes, but if anyone wants to look around and make some tests, you only need to do the following:

 - Install python 3.6 - you can get it [here](https://www.python.org/downloads/).
 - Install pip - already comes with any version of python >=3.4, so you don't need to do anything.
 - Install pipenv - Open a cmd/terminal and write `pip install pipenv` - This is optional, but I recommend doing this instead of using the requirements.txt file.
 - Clone this repo to any folder, then just call `pipenv install` from inside that folder (where the pipfile and pipfile.lock are).
    - If you want to mess around with the code, which at this point in time is the only reason to do all this ^, you should instead call `pipenv install --dev` to also install the testing framework I'm using.
 - Run `pipenv shell`. This will launch a shell in the virtual env, and you'll be able to test everything in this isolated environment.
 - Just to test that it works, run `pytest` (if you have installed the env using `--dev`). 
  
The changes in rev2 will be explained in a more understandable way once I finish the docs for this lib.
 
