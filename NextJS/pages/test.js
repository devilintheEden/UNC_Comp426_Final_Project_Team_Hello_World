import { motion } from "framer-motion"

export default function Test() {
    const list = {
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.3,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: "afterChildren",
            },
        },
    }

    const item = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
    }

    return (
        <div className='measure center bg-gray'>

            <motion.ul
                initial="hidden"
                animate="visible"
                variants={list}
            >
                <motion.li variants={item} >123</motion.li>
                <motion.li variants={item} >456</motion.li>
                <motion.li variants={item} >789</motion.li>
            </motion.ul>
        </div>
    )
}