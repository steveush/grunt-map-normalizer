# @steveush/grunt-map-normalizer v0.0.1

> Normalize the sources properties of generated source maps.

## Getting Started

If you haven't used [Grunt](https://gruntjs.com/) before, be sure to check out the [Getting Started](https://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](https://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install @steveush/grunt-map-normalizer --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('@steveush/grunt-map-normalizer');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](https://gruntjs.com/upgrading-from-0.3-to-0.4)*


## Map Normalizer Task

_Run this task with the `grunt map-normalizer` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](https://gruntjs.com/configuring-tasks) guide.

### Options

#### output

Type: `String`  
Default: `absolute`  

Specifies the output type for a normalized maps' sources property. Can be one of the following:

* `absolute` source paths are converted to absolute paths.
* `file` - source paths are converted to file URLs.
* `relative` - source paths are converted to relative paths.
* `virtual` - source paths are converted to virtual paths with the use of the `root` option.

#### virtualRoot

Type: `String`  
Default: `mapped`  

When using the `virtual` output this value is used to replace the closest common path of all sources.

#### verify

Type: `Boolean`  
Default: `true`  

Whether the sources should be verified. All non-existing files are removed from the final output.

#### filter

Type: `Function( String [, SourceMap ] ):Boolean`  
Default: `null`

A callback function used to filter the sources before being normalized. If `false` is returned from this function then the source and its corresponding content will be removed.

#### modify

Type: `Function( String [, SourceMap ] ):String|False`  
Default: `null`  

A callback function used to modify the normalized sources before the output is written. If `false` is returned from this function then the source and its corresponding content will be removed.

### Usage Examples

#### Normalize all map files in a directory to use absolute paths.

```js
"map-normalizer": {
    options: {
        output: "absolute"
    },
    src: [ 'assets/*.map' ]
}
// map: "C:\\project\assets\example.js.map"
// sources: [ "../src/one.js" ] => [ "C:\\project\src\one.js" ]
// sources: [ "C:\\project\src\one.js" ] => [ "C:\\project\src\one.js" ]
// sources: [ "file:///C:/project/src/one.js" ] => [ "C:\\project\src\one.js" ]
```

#### Normalize all map files in a directory to use relative paths.

```js
"map-normalizer": {
    options: {
        output: "relative"
    },
    src: [ 'assets/*.map' ]
}
// map: "C:\\project\assets\example.js.map"
// sources: [ "../src/one.js" ] => [ "../src/one.js" ]
// sources: [ "C:\\project\src\one.js" ] => [ "../src/one.js" ]
// sources: [ "file:///C:/project/src/one.js" ] => [ "../src/one.js" ]
```

#### Normalize all map files in a directory to use file URLs.

```js
"map-normalizer": {
    options: {
        output: "file"
    },
    src: [ 'assets/*.map' ]
}
// map: "C:\\project\assets\example.js.map"
// sources: [ "../src/one.js" ] => [ "file:///C:/project/src/one.js" ]
// sources: [ "C:\\project\src\one.js" ] => [ "file:///C:/project/src/one.js" ]
// sources: [ "file:///C:/project/src/one.js" ] => [ "file:///C:/project/src/one.js" ]
```

#### Normalize all map files in a directory to use virtual paths.

```js
"map-normalizer": {
    options: {
        output: "virtual",
        virtualRoot: "Custom"
    },
    src: [ 'assets/*.map' ]
}
// map: "C:\\project\assets\example.js.map"
// sources: [ "../src/one.js", "../src/child/two.js" ] => [ "Custom/one.js", "Custom/child/two.js" ]
// sources: [ "C:\\project\src\one.js", "C:\\project\src\child\two.js" ] => [ "Custom/one.js", "Custom/child/two.js" ]
// sources: [ "file:///C:/project/src/one.js", "file:///C:/project/src/child/two.js" ] => [ "Custom/one.js", "Custom/child/two.js" ]
```

#### Filter any sources before normalization.

```js
"map-normalizer": {
    options: {
        output: "relative",
            filter: ( src ) => !src.endsWith( "two.js" )
    },
    src: [ 'assets/*.map' ]
}
// map: "C:\\project\assets\example.js.map"
// sources: [ "../src/one.js", "../src/two.js", "../src/child/three.js" ] => [ "../src/one.js", "../src/child/three.js" ]
// sources: [ "C:\\project\src\one.js", "C:\\project\src\two.js", "C:\\project\src\child\three.js" ] => [ "../src/one.js", "../src/child/three.js" ]
// sources: [ "file:///C:/project/src/one.js", "file:///C:/project/src/two.js", "file:///C:/project/src/child/three.js" ] => [ "../src/one.js", "../src/child/three.js" ]
```

#### Modify any sources after normalization.

```js
"map-normalizer": {
    options: {
        output: "relative",
        modify: ( src ) => {
            // filter out any sources ending with "two.js"
            if ( src.endsWith( "two.js" ) ) return false;
            // replace the normalized sources "../src" segment with "something"
            return src.replace( "../src", "something" );
        }
    },
    src: [ 'assets/*.map' ]
}
// map: "C:\\project\assets\example.js.map"
// sources: [ "C:\\project\src\one.js", "C:\\project\src\two.js", "C:\\project\src\child\three.js" ] => [ "something/one.js", "something/child/three.js" ]
```

#### Options can be specified for all `map-normalizer` tasks and for each `map-normalizer:target`.

##### All Tasks

```js
"map-normalizer": {
    options: {
        output: "relative"
    },
    build: [ 'assets/*.map' ],
    release: [ 'releases/*.map' ]
}
```

##### Per-target

```js
"map-normalizer": {
    build: [ 'assets/*.map' ],
    release: {
        options: {
            output: "relative"
        },
        src: [ 'releases/*.map' ]
    }
}
```

## Changelog

| Version | Date        | Notes                                                                                                                                                                                                                |
|:-------:|:------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| v0.0.1  | 11 Apr 2023 | Initial commit of the repository.                                                                                                                                                                                    |
| v0.0.2  | 11 Apr 2023 | <ul><li>Renamed the `callback` option to `modify`.</li><li>Added the `filter` option to allow sources to be filtered before being normalized.</li><li>Added better `grunt --verbose` logging for the task.</li></ul> |