/* ============================================================
   scripts.js — Home Improvement Calculator
   Unit04
   ============================================================ */

document.getElementById('calcBtn').addEventListener('click', calculate);

function calculate() {

    /* ── Get Input Values ─────────────────────────────────── */
    var width    = parseFloat(document.getElementById('roomWidth').value);
    var depth    = parseFloat(document.getElementById('roomDepth').value);
    var height   = parseFloat(document.getElementById('wallHeight').value);
    var coverage = parseFloat(document.getElementById('paintQuality').value);

    /* ── Validate ─────────────────────────────────────────── */
    if (isNaN(width) || width <= 0) {
        alert('Please enter a valid Room Width greater than 0.');
        document.getElementById('roomWidth').focus();
        return;
    }
    if (isNaN(depth) || depth <= 0) {
        alert('Please enter a valid Room Depth greater than 0.');
        document.getElementById('roomDepth').focus();
        return;
    }
    if (isNaN(height) || height <= 0) {
        alert('Please enter a valid Wall Height greater than 0.');
        document.getElementById('wallHeight').focus();
        return;
    }
    if (isNaN(coverage)) {
        alert('Please select a Paint Quality option.');
        document.getElementById('paintQuality').focus();
        return;
    }

    /* ── Measurements ─────────────────────────────────────── */
    var floorArea   = width * depth;                    /* sq ft              */
    var wallArea    = 2 * (width + depth) * height;     /* sq ft (4 walls)    */
    var ceilingArea = floorArea;                        /* sq ft              */
    var perimeter   = 2 * (width + depth);             /* linear ft          */

    /* ── Helper: round up to nearest 0.5 gallon ──────────── */
    function gallons(sqft, cvg) {
        return Math.ceil((sqft / cvg) * 2) / 2;
    }

    /* ── Paint & Primer ───────────────────────────────────── */
    /* Primer covers all surfaces at 200 sq ft per gallon     */
    var primerGal    = gallons(wallArea + ceilingArea, 200);
    var ceilingGal   = gallons(ceilingArea, coverage);
    var wallGal      = gallons(wallArea, coverage);

    /* ── Flooring ─────────────────────────────────────────── */
    /* Carpet: sq ft / 9 = sq yards, +10% waste, round to 0.1 */
    var carpetYards  = Math.ceil((floorArea / 9) * 1.10 * 10) / 10;
    /* Tack strip: perimeter in linear feet, rounded up       */
    var tackFt       = Math.ceil(perimeter);
    /* Carpet padding matches carpet yardage                  */
    var paddingYards = carpetYards;

    /* ── Update the DOM ───────────────────────────────────── */
    document.getElementById('primerResult').textContent    = primerGal    + ' gal';
    document.getElementById('ceilingResult').textContent   = ceilingGal   + ' gal';
    document.getElementById('wallPaintResult').textContent = wallGal      + ' gal';
    document.getElementById('carpetResult').textContent    = carpetYards  + ' sq yd';
    document.getElementById('tackResult').textContent      = tackFt       + ' lin ft';
    document.getElementById('paddingResult').textContent   = paddingYards + ' sq yd';

    /* Show results, hide placeholder */
    document.getElementById('resultsPlaceholder').hidden = true;
    document.getElementById('resultsGrid').hidden        = false;

    /* Smooth scroll to results on mobile */
    document.getElementById('resultsSection').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}