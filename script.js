/*  PREMIUM LINK PAGE JAVASCRIPT */


/*  ELEMENTS */

const cards =
    document.querySelectorAll(".link-card");

const toast =
    document.getElementById("toast");

const shareButton =
    document.getElementById("shareButton");

const copyEmailButton =
    document.getElementById("copyEmailButton");


/* CARD SCROLL REVEAL */

const cardObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "in-view"
                );

                cardObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -30px 0px"
        }

    );


cards.forEach((card, index) => {

    card.style.animationDelay =
        `${index * 70}ms`;

    cardObserver.observe(card);

});


/* MOUSE FOLLOW BRAND GLASS LIGHT */

cards.forEach((card) => {

    card.addEventListener(
        "pointermove",
        (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        }
    );


    card.addEventListener(
        "pointerenter",
        () => {

            card.classList.add(
                "brand-active"
            );

        }
    );


    card.addEventListener(
        "pointerleave",
        () => {

            card.classList.remove(
                "brand-active"
            );

            card.style.setProperty(
                "--mouse-x",
                "50%"
            );

            card.style.setProperty(
                "--mouse-y",
                "50%"
            );

        }
    );

});


/* TOAST */

let toastTimer;


function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* COPY EMAIL */

if (copyEmailButton) {

    copyEmailButton.addEventListener(
        "click",
        async () => {

            const email =
                "sayyedsahil9017@gmail.com";


            try {

                await navigator.clipboard.writeText(
                    email
                );

                showToast(
                    "Email copied"
                );

            }

            catch (error) {

               
                  /*   Fallback for browsers
                    that block clipboard API. */
                    

                const temporary =
                    document.createElement(
                        "textarea"
                    );

                temporary.value =
                    email;

                document.body.appendChild(
                    temporary
                );

                temporary.select();


                try {

                    document.execCommand(
                        "copy"
                    );

                    showToast(
                        "Email copied"
                    );

                }

                catch (copyError) {

                    showToast(
                        "Copy failed"
                    );

                }


                temporary.remove();

            }

        }
    );

}


/* SHARE */

if (shareButton) {

    shareButton.addEventListener(
        "click",
        async () => {

            const shareData = {

                title:
                    "YOUR NAME",

                text:
                    "Check out my links!",

                url:
                    window.location.href

            };


            try {

                if (
                    navigator.share
                ) {

                    await navigator.share(
                        shareData
                    );

                    return;

                }


                await navigator.clipboard.writeText(
                    window.location.href
                );

                showToast(
                    "Link copied"
                );

            }

            catch (error) {

                
                   /*  User cancelled sharing.
                    Do nothing. */
         
            }

        }
    );

}


/* KEYBOARD ACCESSIBILITY */

document
    .querySelectorAll(".link-card")
    .forEach((card) => {

        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    card.click();

                }

            }
        );

    });


/* PREVENT EMPTY PLACEHOLDER LINKS */

document
    .querySelectorAll("a")
    .forEach((link) => {

        const href =
            link.getAttribute("href");


        if (
            href &&
            (
                href.includes("_URL") ||
                href === "#"
            )
        ) {

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    showToast(
                        "Add your link first"
                    );

                }
            );

        }

    });