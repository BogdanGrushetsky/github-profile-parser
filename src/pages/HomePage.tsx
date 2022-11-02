import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
export interface IHomePageProps {}

export default function HomePage (props: IHomePageProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [ username, setUsername ] = useState<string>('');

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  
  return (
    <div className="container">
        <div className="homePage">
            <div className="homePage_title">My GITHUB Resume</div>
            <div className="homePage_underline" />
            <div className="homePage_search">
                <input ref={inputRef} onChange={() => setUsername(inputRef.current?.value as string)} type="text" className="homePage_input" placeholder="Enter your GitHub username and click on generate"></input>
                <Link className="homePage_search_btn" to={username as string}>Generate</Link>
            </div>
            <Link to="BogdanGrushetsky" className="homePage_example">Site developer profile</Link>
        </div>
    </div>
  );
}
