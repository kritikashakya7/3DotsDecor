import Brand from "../components/Brand";
import img from "../assets/3dot.png";

export const Aboutus = () => {
  return (
    <div className="aboutus-container container py-10 max-lg:p-5">
      <div className="content-container flex max-md:flex-col gap-6 max-md:items-center">
        <img
          src={img}
          className="max-w-[400px] aspect-auto rounded-md object-cover"
          alt="About Us"
        />

        <div className="column space-y-2">
          <p className="text-justify font-bold text-xl flex gap-2">
            At <Brand />
          </p>
          <p className="text-justify">
            Whether you're looking to revamp your home, office, or any other
            space, we bring our expertise and passion for design to every
            project. We understand that each space is unique and requires a
            tailored approach. From the initial consultation to the final
            reveal, we work closely with you to understand your requirements,
            preferences, and aspirations. Our collaborative process ensures that
            your voice is heard and your ideas are incorporated into the design.
          </p>
          <p className="text-justify">
            From concept to completion, we focus on every detail, ensuring that
            the final result not only meets but exceeds your expectations. Our
            services encompass all aspects of interior design, including space
            planning, color consultation, furniture selection, and custom decor.
            We meticulously curate every element to create cohesive and
            harmonious spaces that are both stylish and practical.
          </p>
          <p className="text-justify">
            We pride ourselves on our commitment to quality and excellence. We
            partner with trusted suppliers and craftsmen to source the finest
            materials and products, ensuring that your space is not only
            beautiful but also durable and sustainable. Our designers stay
            abreast of the latest trends and innovations in the industry,
            bringing fresh ideas and creative solutions to each project.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
