import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export interface IResumeProps {}

interface IProfile {
    login: string,
    html_url: string,
    avatar_url: string
    created_at: string,
    public_repos: number
}

interface IRepositorie {
    html_url: string,
    full_name: string,
    updated_at: Date
}

export default function Resume (props: IResumeProps) {
    let { username } = useParams();
    const [err, setErr] = useState<boolean>(false);
    const [ profile, setProfile ] = useState<IProfile>({login: '', html_url: '', avatar_url: '', created_at: '', public_repos: 0});
    const [ repositories, setRepositories ] = useState<Array<IRepositorie>>([]);
    useEffect(() => {
        try {
            fetch(`https://api.github.com/users/${username as string}`).then((response) => response.json()).then((data) => setProfile(data));
            fetch(`https://api.github.com/users/${username as string}/repos`).then((response) => response.json()).then((data) => setRepositories(data));
        } catch(err) {
            setErr(true);
        }
    }, [username]);
    useEffect(() => {
        const sortedRepositories = repositories.sort((objA, objB) => new Date(objA.updated_at).getTime() - new Date(objB.updated_at).getTime());
        setRepositories(sortedRepositories);
    }, [repositories])
    
    const accountExists: Date = new Date(profile?.created_at as string);
    
    function getSecondPart(str: string) {
        return str.split('/')[1] as string;
    }
    
    if(err) {
        return <Link to="/">Error, pls back to Home page</Link>
    }

    return (
    <div className="container">
        <div className="resume">
            <div className="resume_acc">
                { profile?.avatar_url && <img src={ profile?.avatar_url as string } alt="user Avatar"/>}
                <a href={ profile?.html_url as string}>{ profile?.login as string }</a>
                <h2>{`Account exists: ${new Date().getFullYear() - accountExists.getFullYear()} years, ${accountExists.getMonth()} months, ${accountExists.getDay()} days, ${accountExists.getHours()} hours.`}</h2>
                <h2>{`${profile?.login as string} have ${profile?.public_repos as number} public repositories`}</h2>
                <h1>Public repositories</h1>
                {repositories?.map( rep => (<a href={rep.html_url as string}>{getSecondPart(rep.full_name) as string}</a>))}
            </div>
        </div>
    </div>
  );
}
