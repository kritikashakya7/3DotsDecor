import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-secondary mt-10 text-white min-h-[350px] flex items-center">
      <div className="flex flex-col md:flex-row container justify-between m-auto p-4 gap-12">
        <div className="flex flex-col sm:flex-row gap-12">
          <ul className="space-y-3">
            <li>
              <h1 className="text-xl font-bold">Quick Links</h1>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
          </ul>
          <ul className="space-y-3 ">
            <li>
              <h1 className="text-xl font-bold">Contact</h1>
            </li>
            <li>Phone:</li>
            <li className="font-bold">9861740000</li>
            <li>Email:</li>
            <li className="font-bold break-words">
              3dotsdec@gmail.com
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center md:w-[400px] gap-6">
          <h1 className="font-bold text-3xl">Reach out to us!</h1>
          <ul className="flex gap-3 ">
            <li>
              <Facebook className="text-blue-500" />
            </li>
            <li>
              <Instagram className="text-pink-600" />
            </li>
            <li>
              <Linkedin className="text-blue-300" />
            </li>
            <li>
              <Youtube className="text-red-500" />
            </li>
          </ul>
          <p>© 2024 3Dot, Inc.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
