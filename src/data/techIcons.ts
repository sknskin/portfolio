const BASE_URL = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const techs = [
  { name: 'Java', icon: `${BASE_URL}/java/java-original.svg` },
  { name: 'Spring', icon: `${BASE_URL}/spring/spring-original.svg` },
  { name: 'Vue.js', icon: `${BASE_URL}/vuejs/vuejs-original.svg` },
  { name: 'TypeScript', icon: `${BASE_URL}/typescript/typescript-original.svg` },
  { name: 'JavaScript', icon: `${BASE_URL}/javascript/javascript-original.svg` },
  { name: 'Python', icon: `${BASE_URL}/python/python-original.svg` },
  { name: 'Node.js', icon: `${BASE_URL}/nodejs/nodejs-original.svg` },
  { name: 'PostgreSQL', icon: `${BASE_URL}/postgresql/postgresql-original.svg` },
  { name: 'MySQL', icon: `${BASE_URL}/mysql/mysql-original.svg` },
  { name: 'MongoDB', icon: `${BASE_URL}/mongodb/mongodb-original.svg` },
  { name: 'Docker', icon: `${BASE_URL}/docker/docker-original.svg` },
  { name: 'Oracle', icon: `${BASE_URL}/oracle/oracle-original.svg` },
  { name: 'Jenkins', icon: `${BASE_URL}/jenkins/jenkins-original.svg` },
];

export function preloadTechIcons(): Promise<void[]> {
  return Promise.all(
    techs.map(
      (t) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = t.icon;
        }),
    ),
  );
}
