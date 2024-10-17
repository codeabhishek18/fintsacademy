import styles from './styles.module.css'
import live from '@/assets/liveclass.jpg'
import dashboard from '@/assets/userdashboard.png'
import certificate from '@/assets/fingerprint.png'
import record from '@/assets/record.png'
import community from '@/assets/fintscommunity.jpg'
import Image from "next/image";
import BoxReveal from '@/components/magicui/box-reveal'

const features = [
  {
    id:1,
    src: live,
    header:'Live Classes',
    description: 'Join this live session to deep dive into advanced AML techniques, case studies, and real-world applications to help you stay compliant.'
  },
  {
    id:2,
    src: dashboard,
    header:'Learn, Apply, Assess',
    description:'Gain knowledge through interactive sessions and curated materials. Test your understanding with quizzes and assessments to track progress.'
  },
  {
    id:3,
    src: certificate,
    header:'Certification',
    description: 'Earn industry-recognized certificates upon completing course and assessments, showcasing your expertise to potential employers or for personal growth.'
  },
  {
    id:4,
    src: record,
    header:'Recorded classes',
    description: 'Access pre-recorded sessions anytime, allowing you to learn at your own pace and revisit important topics as needed.'
  },
  {
    id:5,
    src: community,
    header:'Community',
    description: 'Connect with fellow learners in a vibrant, interactive space. Share insights, ask questions to enhance your learning experience through collective knowledge.'
  },
]

const FeatureCards = () =>
{

  return(
    <div className={styles.container}>
      {features.map((image)=>
      (
        <div className={styles.section}>
          <Image className={styles.cover} src={image.src} alt='image'/>
          <BoxReveal boxColor='rgba(0,0,0,0)' className={styles.content}>
            <h1 className={styles.header}><span className={styles.count}>0{image.id}.</span>{image.header}</h1>
            <p className={styles.description}>{image.description}</p>
          </BoxReveal>
        </div>
      ))}
    </div>
  )
}

export default FeatureCards

