const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://karinganastudio23:VIbemongodb@cluster0.oe0akin.mongodb.net/nogcdb?retryWrites=true&w=majority";

if (!MONGO_URI) {
  console.error("Error: MONGO_URI environment variable is missing.");
  process.exit(1);
}

// Inline model schemas to ensure the script runs independently of build folders
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const ContentSchema = new mongoose.Schema({
  hero: {
    tag_en: String,
    tag_pt: String,
    titleLine1_en: String,
    titleLine1_pt: String,
    titleLine2_en: String,
    titleLine2_pt: String,
    sub_en: String,
    sub_pt: String,
    bgImage: String,
  },
  services: [
    {
      title_en: String,
      title_pt: String,
      description_en: String,
      description_pt: String,
    }
  ],
  projects: [
    {
      title_en: String,
      title_pt: String,
      category_en: String,
      category_pt: String,
      location_en: String,
      location_pt: String,
      description_en: String,
      description_pt: String,
      image: String,
    }
  ],
  news: [
    {
      category_en: String,
      category_pt: String,
      date_en: String,
      date_pt: String,
      title_en: String,
      title_pt: String,
      description_en: String,
      description_pt: String,
    }
  ]
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Content = mongoose.models.Content || mongoose.model("Content", ContentSchema);

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected successfully.");

    // 1. Create Default Admin User
    const adminEmail = "admin@nogc.co.mz";
    const rawPassword = "@Admin123@";
    
    console.log("Checking for existing administrator account...");
    const existingUser = await User.findOne({ email: adminEmail });
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    if (!existingUser) {
      console.log("Creating default administrator account...");
      const newAdmin = new User({
        email: adminEmail,
        password: hashedPassword
      });
      await newAdmin.save();
      console.log(`Admin user created: ${adminEmail} | password: ${rawPassword}`);
    } else {
      console.log("Administrator account already exists. Updating password...");
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log(`Admin password updated for: ${adminEmail}`);
    }

    // 2. Create Dynamic Site Content
    console.log("Checking for existing site content configurations...");
    const existingContent = await Content.findOne();
    if (!existingContent) {
      console.log("Seeding default bilingual site content...");
      const defaultContent = new Content({
        hero: {
          tag_en: "Mozambique's Energy Partner",
          tag_pt: "Parceiro Energético de Moçambique",
          titleLine1_en: "Powering Mozambique's",
          titleLine1_pt: "Impulsionando o Futuro",
          titleLine2_en: "Energy Future",
          titleLine2_pt: "Energético de Moçambique",
          sub_en: "Delivering innovative, reliable, and sustainable solutions in the Oil & Gas industry, steering Mozambique toward industrial leadership and economic development.",
          sub_pt: "Fornecendo soluções inovadoras, fiáveis e sustentáveis na indústria de Petróleo & Gás, conduzindo Moçambique para a liderança industrial e desenvolvimento económico.",
          bgImage: "/hero_offshore.png"
        },
        services: [
          {
            title_en: "Oil Exploration",
            title_pt: "Exploração de Petróleo",
            description_en: "State-of-the-art upstream geological mapping, drilling exploration, and reserve estimation matching top international practices.",
            description_pt: "Mapeamento geológico upstream de última geração, exploração de perfuração e estimativa de reservas de acordo com as melhores práticas internacionais."
          },
          {
            title_en: "Gas Processing",
            title_pt: "Processamento de Gás",
            description_en: "Advanced liquefaction, filtration, and storage facilities focused on maximizing Mozambique's vast offshore natural gas reserves.",
            description_pt: "Instalações avançadas de liquefação, filtragem e armazenamento focadas em maximizar as vastas reservas de gás natural offshore de Moçambique."
          },
          {
            title_en: "Petroleum Trading",
            title_pt: "Comércio de Petróleo",
            description_en: "Secure, reliable, and compliant supply chain distribution and international arbitrage trading of crude and refined petroleum products.",
            description_pt: "Distribuição da cadeia de abastecimento segura, fiável e conforme, e comércio de arbitragem internacional de produtos petrolíferos brutos e refinados."
          },
          {
            title_en: "Engineering Services",
            title_pt: "Serviços de Engenharia",
            description_en: "Comprehensive front-end engineering design (FEED), project procurement, and plant construction oversight.",
            description_pt: "Projeto abrangente de engenharia de front-end (FEED), aquisição de projetos e supervisão de construção de instalações."
          },
          {
            title_en: "Energy Infrastructure",
            title_pt: "Infraestrutura de Energia",
            description_en: "Construction and management of modern pipelines, refinery modules, bulk terminals, and smart distribution networks.",
            description_pt: "Construção e gestão de gasodutos modernos, módulos de refinarias, terminais de granel e redes de distribuição inteligentes."
          },
          {
            title_en: "Industrial Consulting",
            title_pt: "Consultoria Industrial",
            description_en: "Strategic advisement on environmental impacts, regulatory compliance, energy efficiency, and operational excellence.",
            description_pt: "Aconselhamento estratégico sobre impactos ambientais, conformidade regulamentar, eficiência energética e excelência operacional."
          },
          {
            title_en: "Logistics",
            title_pt: "Logística",
            description_en: "Downstream fuel transport, marine vessel leasing, custom logistics hubs, and secure transport of chemical assets.",
            description_pt: "Transporte de combustível downstream, afretamento de navios marítimos, hubs logísticos personalizados e transporte seguro de ativos químicos."
          },
          {
            title_en: "Renewable Energy Solutions",
            title_pt: "Soluções de Energia Renovável",
            description_en: "Active investment and engineering in solar farms, wind power installations, and biofuel production for sustainable development.",
            description_pt: "Investimento e engenharia ativa em parques solares, instalações de energia eólica e produção de biocombustíveis para o desenvolvimento sustentável."
          }
        ],
        projects: [
          {
            title_en: "Rovuma Basin LNG Development",
            title_pt: "Desenvolvimento de GNL na Bacia do Rovuma",
            category_en: "Natural Gas & LNG",
            category_pt: "Gás Natural & GNL",
            location_en: "Cabo Delgado, Mozambique",
            location_pt: "Cabo Delgado, Moçambique",
            description_en: "Engineering and construction of offshore subsea collecting systems and processing plants for Mozambique's flagship natural gas fields.",
            description_pt: "Engenharia e construção de sistemas de recolha submarina offshore e instalações de processamento para os principais campos de gás natural de Moçambique.",
            image: "/project_lng.png"
          },
          {
            title_en: "Matola Marine Logistics Fleet",
            title_pt: "Frota de Logística Marítima da Matola",
            category_en: "Deepwater Operations",
            category_pt: "Operações em Águas Profundas",
            location_en: "Maputo Bay, Mozambique",
            location_pt: "Baía de Maputo, Moçambique",
            description_en: "Managing deepwater energy vessel operations, offshore drilling logistics, and marine transport of refined petroleum assets.",
            description_pt: "Gestão de operações de navios de energia em águas profundas, logística de perfuração offshore e transporte marítimo de ativos refinados de petróleo.",
            image: "/project_drilling.png"
          },
          {
            title_en: "Mocuba Utility Solar Facility",
            title_pt: "Instalação Solar de Mocuba",
            category_en: "Renewable Energy",
            category_pt: "Energia Renovável",
            location_en: "Zambezia, Mozambique",
            location_pt: "Zambézia, Moçambique",
            description_en: "Installation and operation of 40MW utility-scale photovoltaic grid infrastructure, feeding stable clean energy to local grids.",
            description_pt: "Instalação e operação de infraestrutura de rede fotovoltaica de 40MW em escala de serviço público, fornecendo energia limpa estável às redes locais.",
            image: "/project_solar.png"
          }
        ],
        news: [
          {
            category_en: "Press Release",
            category_pt: "Comunicado de Imprensa",
            date_en: "July 08, 2026",
            date_pt: "08 de Julho de 2026",
            title_en: "NOGC Expands Local Engineering Capacity in Matola",
            description_en: "Inaugurating our state-of-the-art training hub, offering ISO safety certifications and advanced fluid dynamics studies for Mozambican graduates.",
            description_pt: "Inaugurando o nosso centro de formação avançado, que oferece certificações de segurança ISO e estudos avançados de dinâmica de fluidos para licenciados moçambicanos."
          },
          {
            category_en: "Sustainability",
            category_pt: "Sustentabilidade",
            date_en: "June 24, 2026",
            date_pt: "24 de Junho de 2026",
            title_en: "Mocuba Solar Project Reaches Full 40MW Grid Integration",
            description_en: "Successfully delivering clean electricity to the northern grid, offsetting over 25,000 tons of CO2 emissions annually.",
            description_pt: "Fornecimento de eletricidade limpa com sucesso à rede norte, compensando mais de 25.000 toneladas de emissões de CO2 anualmente."
          },
          {
            category_en: "Operations",
            category_pt: "Operações",
            date_en: "May 15, 2026",
            date_pt: "15 de Maio de 2026",
            title_en: "Strategic Marine Logistics Agreement Signed for Rovuma Basin",
            description_en: "Partnering with global maritime developers to deploy next-generation subsea infrastructure and pipeline monitoring vessels.",
            description_pt: "Parceria com promotores marítimos globais para implantar navios de monitorização de infraestruturas submarinas e gasodutos de próxima geração."
          }
        ]
      });

      await defaultContent.save();
      console.log("Database seeded successfully with dynamic web contents!");
    } else {
      console.log("Site configurations document already exists in database.");
    }
    
    console.log("Database seeding completed.");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
