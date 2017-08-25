# Melon-Chart-Module for the MagicMirror

[MagicMirror Project on Github](https://github.com/MichMich/MagicMirror/)

## Usage

You need to install the module for your MagicMirror.

### Installation

Navigate into your MagicMirror's modules folder:

```shell
cd ~/MagicMirror/modules
```

Clone this repository:

```shell
git clone https://github.com/Kiina/MMM-melon
```

Go into the directory and run npm install:

```shell
cd MMM-melon
npm install
```

Configure the module in your config.js file.

### Configuration

To run the module, you need to add the following data to your config.js file.

```
{
    module: 'MMM-melon',
    position: 'top_center', // you may choose any location
    config: {
        updateInterval: 60 * 60 * 1000, //every 60 minutes
        initialLoadDelay: 0,
        colored: false,
        fade: true,
        fadePoint: 0.5,
        fadeListBigger: 3,
        cutLine: 5 //how many results
    }
}
```
