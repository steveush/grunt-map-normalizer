const absoluteIsMissing = require( "./absoluteIsMissing" );
const absoluteToFileUri = require( "./absoluteToFileUri" );
const absoluteToRelative = require( "./absoluteToRelative" );
const absoluteToVirtual = require( "./absoluteToVirtual" );
const anyToAbsolute = require( "./anyToAbsolute" );
const commonOfAbsolute = require( "./commonOfAbsolute" );
const filterSources = require( "./filterSources" );
const isFn = require( "./isFn" );
const modifySources = require( "./modifySources" );
const pruneSources = require( "./pruneSources" );
const segmentIfEqual = require( "./segmentIfEqual" );

//region type-definitions

/**
 * An object that can be normalized.
 * @typedef {object} MapLike
 * @property {string[]} sources
 * @property {string[]} [sourcesContent]
 */

//endregion

module.exports = {
    absoluteIsMissing,
    absoluteToFileUri,
    absoluteToRelative,
    absoluteToVirtual,
    anyToAbsolute,
    commonOfAbsolute,
    filterSources,
    isFn,
    modifySources,
    pruneSources,
    segmentIfEqual
};