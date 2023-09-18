import { FunctionComponent } from "react";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return (
        <>
            <div className="container">
                <h1 className="text-center text-decoration-underline mb-4 display-3">About this site</h1>
                <h3>About Us: Your Ultimate Business Card Solution</h3>
                <p>Welcome to Bcard, your premier destination for high-quality, customized business cards that make lasting impressions. We understand that in today's fast-paced business world, a well-designed business card is more than just a piece of paper – it's a powerful tool that represents your brand, communicates your identity, and creates connections that can lead to meaningful opportunities.</p>
                <h3>Our Mission</h3>
                <p>At Bcard, our mission is to empower professionals, entrepreneurs, and businesses of all sizes with the tools they need to leave a lasting impact. We believe that a well-crafted business card is an essential part of personal and professional success, and we're here to help you stand out from the crowd with designs that reflect your unique style and vision.</p>
                <h3>Why Choose Us?</h3>
                <ol className="list-group list-group-numbered">
                    <li className="list-group-item"><b>Unparalleled Design:</b> Our team of talented designers is dedicated to creating business cards that not only capture your brand's essence but also resonate with your target audience. Whether you're looking for a sleek and modern design or something more traditional, we have the expertise to bring your ideas to life.</li>
                    <li className="list-group-item"><b>Premium Quality:</b> We understand that first impressions matter, which is why we use only the highest quality materials and printing techniques to ensure that your business cards look and feel exceptional. Our commitment to quality extends to every aspect of the design and production process.</li>
                    <li className="list-group-item"><b>Customization Options:</b> Your business is unique, and your business card should reflect that. With a wide range of customization options – from paper types and finishes to fonts and colors – you have the creative freedom to design a card that's as one-of-a-kind as your brand.</li>
                </ol>
            </div>
        </>
    );
}

export default About;