import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MobileNav(props) {
    const navLinks = [
        { name: "Home", href: "/#home" },
        { name: "About", href: "/#about" },
        { name: "Programs", href: "/#programs" },
        { name: "Contact", href: "/#contacts" },
    ];
    return (
        <AnimatePresence>
            {props.isMenuBtnOn && (
                <motion.div
                    className="md:hidden fixed top-26 left-0 right-0   z-50   overflow-hidden flex p-5 justify-center "
                    initial={{ y: -500, opacity: 0 }}
                    animate={{ y: 0.5, opacity: 1 }}
                    exit={{ y: -500, opacity: 1 }}
                    transition={{
                        type: "tween",
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                >
                    <nav className="flex flex-col bg-cyan-950/70 w-150 p-15 rounded-3xl shadow-2xl">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => {
                                    props.setActiveMenu(link.name);
                                    props.setIsMenuBtnOn(false);
                                }}
                                className="flex justify-center items-center h-15 no-underline"
                            >
                                <motion.div
                                    className="w-full h-full flex justify-center items-center text-amber-200 text-3xl font-semibold hover:bg-cyan-950/90 hover:border-2 hover:rounded-4xl"
                                >
                                    {link.name}
                                </motion.div>
                            </Link>
                        ))}
                    </nav>
                </motion.div>
            )}

        </AnimatePresence>)

}