# File Scraper

Scrape the directory in which this project is located for files containing lines of code matching a given citeria.

## Usage

Clone repo into the directory containing the folders you would like to scrape. This directory is referred to as `searchDir` in data.js.

```
git clone git@github.com:Rinbo/nodejs-file-crawler.git
```

Create a folder called data and a file called output.txt.

```
mkdir data
touch data/output.txt
```

In `index.js`, define the file type you would like to search for by assigning it to constant `FILE_EXTENTION`.

In function `appendToOutputFile`, define the matchers to suit your criteria (lines 93-101).

Run index.js

```
node index.js
```

output.txt will now be populated with lines according to how you defined the search params. Currently, the maximum deapth is three folders down. Extend it as per your requirements.

Note: The following folders and files are not searched (can be modified in data.js): 

```
node_modules
.git
.gitignore
bundle.js
```
## Reqs
Node.js




