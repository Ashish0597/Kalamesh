LOGO ............ replace images/logo.png (PNG/WebP, transparent, ~200px tall). Search "LOGO:" in index.html.
HERO ROBOT ...... index.html -> <spline-viewer url="..."> (swap the url to use your own Spline scene).
WORK (carousel) . edit the <img src> list inside #wl in index.html (portrait 4:5 works best).
VISUALISATION ... open js/disciplines.js and edit the WORK list at the top:
                  - images: { type:"image", src:"images/work/my-shot.jpg", title:"...", tag:"3D / CGI", cat:"cgi", ratio:"4/5" }
                  - videos: { type:"video", src:"videos/my-reel.mp4", poster:"images/work/my-reel.jpg", ... }
                  Keep videos short (5-15s), compressed (H.264 mp4, under ~5 MB) so the page stays fast.
TEXT ............ the 4 discipline texts live in js/disciplines.js -> content.
MARKETING CASE STUDIES: js/case-studies.js -> the object D at the top holds every number and text.
                  Items shown as "—" were empty in the source; fill them in there. Remove the credit line with CREDIT = "".
