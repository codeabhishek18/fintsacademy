import styles from './styles.module.css'
import live from '@/assets/liveclass.jpg'
import dashboard from '@/assets/userdashboard.png'
import certificate from '@/assets/fintscertify.png'
import record from '@/assets/record.png'
import community from '@/assets/fintscommunity.jpg'
import Image from "next/image";
import BoxReveal from '@/components/magicui/box-reveal'

const images = [
  {
    id:1,
    src: live,
    header:'Live Classes',
    description: 'Join this live session to deep dive into advanced AML techniques, case studies, and real-world applications to help you stay compliant and enhance your knowledge of financial crime prevention.'
  },
  {
    id:2,
    src: dashboard,
    header:'Learn, Assess, Apply',
    description:'Gain knowledge through interactive sessions and curated materials. Practice your skills with real-world tasks and case studies. Test your understanding with quizzes and assessments to track progress.'
  },
  {
    id:3,
    src: certificate,
    header:'Certification',
    description: 'Earn industry-recognized certificates upon completing courses and assessments, showcasing your expertise and achievements to potential employers or for personal growth.'
  },
  {
    id:4,
    src: record,
    header:'Recorded classes',
    description: 'Access pre-recorded sessions anytime, allowing you to learn at your own pace and revisit important topics as needed. Perfect for catching up or reinforcing your understanding.'
  },
  {
    id:5,
    src: community,
    header:'Community',
    description: 'Connect with fellow learners and experts in a vibrant, interactive space. Share insights, ask questions, and collaborate on projects to enhance your learning experience through collective knowledge.'
  },
]

const FeatureCards = () =>
{

  return(
    <div className={styles.container}>
      {images.map((image)=>
      (
        <div className={image.id%2 === 0 ? `${styles.section} ${styles.flip}` : styles.section}>
          <Image className={styles.cover} src={image.src} alt='image'/>
          <BoxReveal boxColor='var(--primary-bg)' className={styles.content}>
            <h1 className={styles.header}><span className={styles.count}>0{image.id}.</span>{image.header}</h1>
            <p className={styles.description}>{image.description}</p>
          </BoxReveal>
        </div>
      ))}
    </div>
  )
}

export default FeatureCards

