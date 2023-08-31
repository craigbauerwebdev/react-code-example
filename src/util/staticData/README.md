# ⚠️ Follow Instructions ⚠️

## Here we will store all the static data for the website

### why should we do this?

1. component should be stupid and have no data, like this when we make this into
   a template for another event all our data is located in one single place
2. if in the future we add a CMS we no longer have to be the one editing the
   links/name of buttons ect.

### You see a component that has static data

1.  Copy the relative path to it, Example
    `src/Components/Banners/HorizontalSponsorBanner.js`
2.  now create a file with that same path,Example
    `staticData/Components/Banners/HorizontalSponsorBanner.data.js`

### What data should I put here

1. anything that is had coded (urls, names, anything that is not a piece of
   code).

### all strings that are copy and images urls should be in en.js
