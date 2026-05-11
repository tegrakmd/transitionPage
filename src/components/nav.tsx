"use client"
import { useTransitionRouter } from "next-view-transitions"

const Navbar = () => {
    const router = useTransitionRouter()

    function slideInOut(){
        document.documentElement.animate(
        [
            {
                opacity:1,
                transform: "translateY(0)",
            },
            {
                opacity:0.2,
                transform: "translateY(-35%)",
            }
        ],{
            duration: 1500,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)",
        }
    )
        document.documentElement.animate([
            {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            }
        ],{
            duration: 1500,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
        }
    )};
    return (
        <div className="flex justify-between items-center p-4 z-30 fixed top-0 left-0 right-0 bg-transparent dark:bg-transparent text-white ">
          <div className="link">
            <a onClick={(e) => {e.preventDefault();
             router.push("/",
                { onTransitionReady:slideInOut,

                });
            } }
            href="/">Home</a>
        </div>
        <div className="link">
            <a onClick={(e) => {e.preventDefault();
             router.push("/about",
                { onTransitionReady:slideInOut,

                });
            } }
            href="/about">About</a>
        </div>
        </div>
    );
};

export default Navbar;
