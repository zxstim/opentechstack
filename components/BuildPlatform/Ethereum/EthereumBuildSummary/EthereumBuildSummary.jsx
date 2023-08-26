import Link from 'next/link';
import AlertMessage from '../../../AlertMessage/AlertMessage';

export default function EthereumBuildSummary() {
  return (
    <>
      <h2>Summary</h2>
      <p>
        Ethereum is a network of computers all over the world that follow a set of rules called the Ethereum protocol. It was proposed in late 2013 by programmer Vitalik Buterin and launched in 2015. The Ethereum network acts as the foundation for communities, applications, organizations and digital assets that anyone can build and use. 
      </p>
      <p>
        You can create an Ethereum account from anywhere, at any time, and explore a world of apps or build your own. The core innovation is that you can do all this via smart contract, which is a self-executing contract where the terms of the agreement are written into code, without trusting a central authority that could change the rules or restrict your access.
      </p>
      <AlertMessage 
        type="info"
        headline="Need more information?" 
        message="Read the full article about Ethereum [here ➡️](https://www.opentechstack.com/reading/understanding-ethereum-exploring-the-revolutionary-blockchain-platform)"
        markdown={true}
      />
      <p>Ethereum can be used to build the followings</p>
      <h2>Roadmap to becoming an Ethereum Developer</h2>
      <p>Congratulations, knowledge-seeker! You've stumbled upon your very own treasure map in the realm of learning. Our team has meticulously crafted this roadmap to be your trusty guide through the vast landscape of knowledge. From the foothills of basics to the peaks of expertise, this path is sprinkled with practical tools and fascinating insights. It's like having a GPS for your brain, leading you through the labyrinth of learning with finesse and flair. So buckle up, fasten your seatbelt, and let's navigate this intellectual adventure together. Get ready to unlock the secrets of learning and level up like a pro! Happy trails!</p>
      <Link 
        href="/build-web3/ethereum/developer-roadmap"
        >
        Go to Roadmap ➡️
      </Link>
      <h2>Build on Ethereum</h2>
      <p>We take pride in our dedication to empowering developers like you with the most comprehensive and up-to-date resources. As trailblazers in the realm of blockchain technology, we have meticulously compiled a vast collection of guides for popular smart contract designs, patterns, and top-notch security practices. Whether you're a seasoned developer or a curious newcomer, these guides are your compass to navigate the intricacies of smart contract development with confidence and ease. From battle-tested best practices to innovative approaches, we've got you covered. So, dive in, explore, and let our treasure trove of wisdom fuel your journey towards building secure and groundbreaking decentralized applications. The future of blockchain development awaits, and we're thrilled to be your faithful guide on this exhilarating quest!</p>
      <Link 
        href="/build-web3/ethereum/developer-library"
        >
        Go to Library ➡️
      </Link>
      <h2>Developer Statistics</h2>
      <p>Here are some statistics about Ethereum developer ecosystem</p>
    </>
  );
}