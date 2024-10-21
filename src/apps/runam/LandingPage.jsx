// LandingPage.js
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Nav from "../../components/nav";
import Container2 from "../../components/container2";
import Container3 from "../../components/container3";
import Container4 from "../../components/container4";
import Container5 from "../../components/container5";
import Container6 from "../../components/container6";
import Container7 from "../../components/container7";
import Footer from "../../components/footer";

// Motion component for Chakra UI Box
const MotionBox = motion(Box);

// Animation variants
const scrollVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

function LandingPage() {
  return (
    <div>
      {/* Keep the header's original styling */}
      <div className="absolute z-20 bg-white">
        <Nav />
      </div>

      {/* Animated sections with Chakra UI */}
      <MotionBox
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollVariant}
        mb={8}
      >
        <Container2 />
      </MotionBox>

      <MotionBox
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollVariant}
        mb={8}
      >
        <Container3 />
      </MotionBox>

      <MotionBox
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollVariant}
        mb={8}
      >
        <Container4 />
      </MotionBox>

      <MotionBox
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollVariant}
        mb={8}
      >
        <Container5 />
      </MotionBox>

      <MotionBox
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollVariant}
        mb={8}
      >
        <Container6 />
      </MotionBox>

      <MotionBox
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollVariant}
        mb={8}
      >
        <Container7 />
      </MotionBox>

      <MotionBox
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollVariant}
      >
        <Footer />
      </MotionBox>
    </div>
  );
}

export default LandingPage;
