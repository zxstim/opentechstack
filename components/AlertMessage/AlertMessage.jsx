import styles from "./AlertMessage.module.css";
import Linkify from 'react-linkify';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/cjs/styles/hljs';



export default function AlertMessage({ type, headline, message, markdown=false }) {

    function getAlertType() {
        switch (type) {
            case "success":
                return styles.success;
                break;
            case "warning":
                return styles.warning;
                break;
            case "error":
                return styles.error;
                break;
            case "neutral":
                return styles.neutral;
                break;
            case "special":
                return styles.special;
                break;
            default:
                return styles.info;
                break;
        }
    }

    function getHeadlineType() {
        switch (type) {
            case "success":
                return styles.headline_success;
                break;
            case "warning":
                return styles.headline_warning;
                break;
            case "error":
                return styles.headline_error;
                break;
            case "neutral":
                return styles.headline_neutral;
                break;
            case "special":
                return styles.headline_special;
                break;    
            default:
                return styles.headline_info;
                break;
        }
    }

    return (
        <div className={getAlertType()}>
            <div className={getHeadlineType()}>{headline}</div>
            {
                markdown ?
                <div>
                    <ReactMarkdown
                        children={message}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, "")}
                                style={github}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                                />
                            ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                            );
                            },
                        }}
                    />
                </div>  
                :
                <div><Linkify>{message}</Linkify></div> 
            }
        </div>
    );
}