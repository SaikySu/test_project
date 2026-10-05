import { GardenData } from '../types/garden';

export const DEFAULT_GARDEN_DATA: GardenData = {
  profile: {
    name: "Nguyễn Minh Khang (Alex Nguyen)",
    title: {
      vi: "Nhà nghiên cứu AI & Kỹ sư Phần mềm · Người làm vườn tri thức số",
      en: "AI Researcher & Software Engineer · Digital Knowledge Gardener"
    },
    bio: {
      vi: "Chào mừng đến với khu vườn số của tôi — nơi tôi gieo mầm các ý tưởng, nuôi dưỡng các bài nghiên cứu về Trí tuệ Nhân tạo, chia sẻ dự án mã nguồn mở và lưu giữ những rung cảm từ tiểu thuyết, âm nhạc và thiết kế game.",
      en: "Welcome to my digital garden — a space where I cultivate ideas, nurture AI research papers, share open-source projects, and collect thoughts on literature, music, and game design."
    },
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    location: "Hà Nội, Việt Nam / Remote",
    email: "nhungthubandangcan2002@gmail.com",
    github: "https://github.com",
    scholar: "https://scholar.google.com",
    stats: {
      startedYear: 2021,
      notesCount: 28,
      evergreenCount: 14
    }
  },
  categories: [
    {
      id: "work_research",
      name: {
        vi: "Làm việc & Nghiên cứu",
        en: "Work & Research"
      },
      description: {
        vi: "Thông tin cá nhân, dự án mã nguồn mở, nghiên cứu khoa học và bài viết chuyên môn.",
        en: "Personal profile, open-source projects, scientific research, and technical articles."
      },
      subcategories: [
        { id: "research", name: { vi: "Nghiên cứu khoa học", en: "Scientific Research" } },
        { id: "projects", name: { vi: "Dự án cá nhân", en: "Personal Projects" } },
        { id: "articles", name: { vi: "Bài viết chuyên sâu", en: "Technical Articles" } }
      ]
    },
    {
      id: "interests",
      name: {
        vi: "Sở thích cá nhân",
        en: "Personal Interests"
      },
      description: {
        vi: "Tiểu thuyết say mê, video tuyển chọn, giai điệu âm nhạc, tản văn blog và ý tưởng phát triển game.",
        en: "Favorite novels, curated videos, music playlists, casual blog thoughts, and game design concepts."
      },
      subcategories: [
        { id: "novels", name: { vi: "Tiểu thuyết & Sách", en: "Novels & Books" } },
        { id: "video", name: { vi: "Video & Phim ảnh", en: "Videos & Cinema" } },
        { id: "music", name: { vi: "Âm nhạc", en: "Music & Playlists" } },
        { id: "blog", name: { vi: "Tản văn / Blog", en: "Blog & Musings" } },
        { id: "game_ideas", name: { vi: "Ý tưởng làm game", en: "Game Design Ideas" } }
      ]
    }
  ],
  articles: [
    {
      id: "quantum-graph-neural-networks",
      title: {
        vi: "Nghiên cứu về Mạng Neural Đồ thị Lượng tử (QGNN) trong Tối ưu hóa Rời rạc",
        en: "Research on Quantum Graph Neural Networks (QGNN) in Discrete Optimization"
      },
      date: "2026-03-28",
      category: "work_research",
      subcategory: "research",
      growthStage: "evergreen",
      summary: {
        vi: "Khám phá cấu trúc lai lượng tử - cổ điển để giải quyết bài toán NP-hard đồ thị với hàm mất mát Hamilton và bằng chứng hội tụ toán học.",
        en: "Exploring hybrid quantum-classical architectures to solve NP-hard graph problems with Hamiltonian loss functions and mathematical proofs."
      },
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
      tags: ["Quantum Computing", "Deep Learning", "Mathematics", "Graph Theory"],
      readTime: "8 min",
      content: {
        vi: `### Giới thiệu và Động lực Nghiên cứu

Các bài toán tối ưu hoá tổ hợp rời rạc như **Max-Cut** hay **Traveling Salesperson Problem (TSP)** đặt ra thách thức lớn đối với siêu máy tính cổ điển khi kích thước đồ thị $V$ tăng theo hàm mũ:

$$\\mathcal{O}(2^{|V|})$$

Trong nghiên cứu này, chúng tôi đề xuất kiến trúc **Quantum Graph Neural Network (QGNN)** lai, kết hợp tầng truyền tin cổ điển (Classical Message Passing) với mạch lượng tử biến phân (Parameterized Quantum Circuits - PQC).

#### 1. Định nghĩa Toán học và Không gian Hilbert

Xét đồ thị $G = (V, E)$ với ma trận kề $A \\in \\{0, 1\\}^{n \\times n}$. Mỗi nút $v_i \\in V$ được ánh xạ vào một qubit trong không gian Hilbert $\\mathcal{H}^{\\otimes n}$.

Trạng thái cơ sở lượng tử được chuẩn hoá:

$$|\\psi(\\boldsymbol{\\theta})\\rangle = \\prod_{l=1}^{L} U_l(\\boldsymbol{\\theta}_l) |0\\rangle^{\\otimes n}$$

Trong đó toán tử tiến hoá $U_l(\\boldsymbol{\\theta}_l)$ được biểu diễn qua phép biến đổi đơn giao (Unitary transformation):

$$U_l(\\boldsymbol{\\theta}_l) = \\exp\\left(-i \\sum_{(j, k) \\in E} J_{jk} Z_j Z_k - i \\sum_{j \\in V} h_j X_j\\right)$$

với $Z_j, X_j$ lần lượt là các toán tử ma trận Pauli-Z và Pauli-X.

#### 2. Hàm Mất Mát Hamilton (Hamiltonian Objective)

Mục tiêu tối ưu hoá là cực tiểu hoá giá trị kỳ vọng của toán tử Hamilton bài toán:

$$\\mathcal{L}(\\boldsymbol{\\theta}) = \\langle \\psi(\\boldsymbol{\\theta}) | \\hat{H}_C | \\psi(\\boldsymbol{\\theta}) \\rangle = \\text{Tr}\\left(\\hat{H}_C \\rho(\\boldsymbol{\\theta})\\right)$$

Bằng cách áp dụng định lý đạo hàm lượng tử (Parameter-shift rule), gradient của hàm mất mát đối với tham số $\\theta_k$ được tính toán chính xác mà không cần xấp xỉ sai phân:

$$\\frac{\\partial \\mathcal{L}}{\\partial \\theta_k} = \\frac{\\mathcal{L}(\\theta_k + \\frac{\\pi}{2}) - \\mathcal{L}(\\theta_k - \\frac{\\pi}{2})}{2}$$

#### 3. Kết quả Thực nghiệm

Mô hình đạt độ chính xác tương đối $98.4\\%$ so với nghiệm tối ưu toàn cục trên tập đồ thị ngẫu nhiên Erdős–Rényi với 32 đỉnh, vượt trội hơn thuật toán cổ điển Simulated Annealing đến 14.2% về thời gian hội tụ.`,
        en: `### Introduction & Research Motivation

Discrete combinatorial optimization problems such as **Max-Cut** and the **Traveling Salesperson Problem (TSP)** pose computational bottlenecks for classical computing systems as graph order grows exponentially:

$$\\mathcal{O}(2^{|V|})$$

We propose a hybrid **Quantum Graph Neural Network (QGNN)** framework combining classical message passing layers with Parameterized Quantum Circuits (PQC).

#### 1. Mathematical Formulation & Hilbert Space

Given graph $G = (V, E)$ with adjacency matrix $A \\in \\{0, 1\\}^{n \\times n}$, each node $v_i$ is mapped to a qubit within Hilbert space $\\mathcal{H}^{\\otimes n}$.

The parameterized quantum state is given by:

$$|\\psi(\\boldsymbol{\\theta})\\rangle = \\prod_{l=1}^{L} U_l(\\boldsymbol{\\theta}_l) |0\\rangle^{\\otimes n}$$

The unitary evolution operator incorporates Ising-type edge interactions:

$$U_l(\\boldsymbol{\\theta}_l) = \\exp\\left(-i \\sum_{(j, k) \\in E} J_{jk} Z_j Z_k - i \\sum_{j \\in V} h_j X_j\\right)$$

#### 2. Hamiltonian Cost Function

Optimization minimizes the expectation value of cost Hamiltonian $\\hat{H}_C$:

$$\\mathcal{L}(\\boldsymbol{\\theta}) = \\langle \\psi(\\boldsymbol{\\theta}) | \\hat{H}_C | \\psi(\\boldsymbol{\\theta}) \\rangle = \\text{Tr}\\left(\\hat{H}_C \\rho(\\boldsymbol{\\theta})\\right)$$

Using the quantum parameter-shift rule:

$$\\frac{\\partial \\mathcal{L}}{\\partial \\theta_k} = \\frac{\\mathcal{L}(\\theta_k + \\frac{\\pi}{2}) - \\mathcal{L}(\\theta_k - \\frac{\\pi}{2})}{2}$$`
      }
    },
    {
      id: "synapse-engine-open-source",
      title: {
        vi: "Synapse Engine: Công cụ suy luận đa mô thức cục bộ hiệu năng cao",
        en: "Synapse Engine: High-Performance Local Multimodal Inference Engine"
      },
      date: "2026-03-15",
      category: "work_research",
      subcategory: "projects",
      growthStage: "budding",
      summary: {
        vi: "Dự án cá nhân mã nguồn mở viết bằng Rust và WebGPU giúp chạy các mô hình ngôn ngữ và thị giác trực tiếp trên trình duyệt mà không cần máy chủ GPU đắt đỏ.",
        en: "An open-source personal project written in Rust and WebGPU allowing multimodal LLM inference directly in client browsers without expensive GPU clusters."
      },
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      tags: ["Rust", "WebGPU", "Inference", "Open Source", "Wasm"],
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      readTime: "6 min",
      content: {
        vi: `### Giới thiệu Synapse Engine

**Synapse Engine** sinh ra từ mong muốn đưa trí tuệ nhân tạo trở về tận tay người dùng cuối (Edge & Local First). Thay vì phụ thuộc vào các API đám mây có độ trễ cao và chi phí lớn, Synapse tận dụng năng lượng tính toán của chip đồ hoạ Apple Silicon (Metal) và WebGPU trên Chrome/Safari.

#### Kiến trúc Cốt lõi

1. **Rust Core**: Quản lý bộ nhớ không rác (Zero-copy memory mapping), hỗ trợ lượng tử hoá mô hình dạng \`INT4\`, \`FP8\`, và \`AWQ\`.
2. **WebGPU Shader Pipelines**: Viết trực tiếp bằng ngôn ngữ bóng đổ WGSL, tối ưu hoá phép nhân ma trận FlashAttention-3:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}} + M\\right)V$$

\`\`\`rust
pub struct TensorPipeline {
    device: wgpu::Device,
    queue: wgpu::Queue,
    compute_pipeline: wgpu::ComputePipeline,
}

impl TensorPipeline {
    pub async fn forward_matmul(&self, input: &Tensor) -> Result<Tensor, InferenceError> {
        // Tận dụng tile-based matrix multiplication song song
        self.dispatch_shader_grid(input.dims()).await
    }
}
\`\`\`

#### Các tính năng chính:
- Tốc độ sinh token đạt **48 tokens/giây** đối với mô hình 7B trên chip M3 Max.
- Tích hợp pipeline hình ảnh clip-vit và text-to-speech độ trễ dưới 80ms.
- Kho mã nguồn mở trên GitHub với hơn 1,400 Stars.`,
        en: `### Synapse Engine Overview

**Synapse Engine** was built around the principle of Edge-First AI. Instead of relying on proprietary cloud APIs with high latency, Synapse harnesses WebGPU and Metal shaders directly inside standard modern browsers.

#### Core Architecture
- **Rust Core with Zero-Copy**: Memory-efficient weight streaming supporting \`INT4\` and \`FP8\`.
- **Handcrafted WGSL Shaders**: FlashAttention-3 implementation with tiled matrix multiplication:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}} + M\\right)V$$`
      }
    },
    {
      id: "transformer-kv-cache-optimization",
      title: {
        vi: "Tối ưu hóa KV-Cache trong Mô hình Ngôn ngữ Lớn: Từ PagedAttention đến Slotted Paging",
        en: "KV-Cache Optimization in LLMs: From PagedAttention to Slotted Paging"
      },
      date: "2026-02-20",
      category: "work_research",
      subcategory: "articles",
      growthStage: "evergreen",
      summary: {
        vi: "Phân tích kiến trúc bộ nhớ cache cho Self-Attention, giải quyết hiện tượng phân mảnh bộ nhớ VRAM khi xử lý ngữ cảnh siêu dài 1M token.",
        en: "Deep dive into Self-Attention key-value caching, mitigating VRAM fragmentation for ultra-long 1M token context windows."
      },
      coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      tags: ["LLM", "Systems", "Performance", "Cache"],
      readTime: "10 min",
      content: {
        vi: `### Vấn đề Nan giải của Bộ nhớ KV Cache

Trong quá trình sinh từ tự hồi quy (Autoregressive generation), mỗi token mới đòi hỏi phải tính toán tương quan với toàn bộ các khóa ($K$) và giá trị ($V$) của các token trước đó. Bộ nhớ yêu cầu cho một phiên giải mã với chiều dài ngữ cảnh $T$ là:

$$\\text{Memory}_{\\text{KVCache}} = 2 \\times b \\times l \\times h \\times d \\times T \\times \\text{bytes\\_per\\_element}$$

Trong đó:
- $b$: batch size
- $l$: số lượng layers
- $h$: số lượng attention heads
- $d$: chiều kích thước mỗi head

Với mô hình 70B tham số và ngữ cảnh $T = 128{,}000$, dung lượng KV Cache tiêu tốn vượt quá **35 GB VRAM** cho chỉ một luồng người dùng duy nhất!

#### Thuật toán Phân mảnh Trang Bộ nhớ (Slotted Paging)

Chúng tôi thiết kế bảng tra cứu ảo \`Virtual Page Table\` tương tự hệ điều hành Linux:

\`\`\`text
Logical Tokens:  [0..15] -> Physical Block #42 (GPU H100)
Logical Tokens: [16..31] -> Physical Block #108
Logical Tokens: [32..47] -> Physical Block #12
\`\`\`

Nhờ đó tỉ lệ lãng phí bộ nhớ do phân mảnh ngoài giảm từ **68% xuống dưới 3.5%**, nâng thông lượng máy chủ lên gấp 3.8 lần.`,
        en: `### The Bottleneck of KV Cache Memory

Autoregressive decoding retains keys and values across every preceding token, scaling linearly with sequence length:

$$\\text{Memory}_{\\text{KVCache}} = 2 \\times b \\times l \\times h \\times d \\times T \\times \\text{bytes\\_per\\_element}$$

By introducing virtual memory pagination inspired by operating system paging, memory fragmentation drops from 68% to under 3.5%.`
      }
    },
    {
      id: "novel-three-body-problem-reflections",
      title: {
        vi: "Chiêm nghiệm về 'Tam Thể' và Định lý Khu rừng Đen trong Xã hội học Vũ trụ",
        en: "Reflections on 'The Three-Body Problem' and the Dark Forest Hypothesis"
      },
      date: "2026-03-22",
      category: "interests",
      subcategory: "novels",
      growthStage: "evergreen",
      summary: {
        vi: "Những suy tưởng từ bộ ba tiểu thuyết khoa học viễn tưởng vĩ đại của Lưu Từ Hân: Khi sự sinh tồn là nhu cầu bậc nhất và nghi kỵ là hằng số giữa các nền văn minh.",
        en: "Philosophical notes on Liu Cixin's sci-fi masterpiece: When survival is civilization's primal law and suspicion spans interstellar gulfs."
      },
      coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      tags: ["Sci-Fi", "Books", "Philosophy", "Liu Cixin"],
      readTime: "7 min",
      content: {
        vi: `> "Vũ trụ là một khu rừng đen. Mỗi nền văn minh đều là một gã thợ săn mang súng, rón rén bước đi giữa những hàng cây như một bóng ma..."

Bộ ba tiểu thuyết *Tam Thể (The Three-Body Problem)* không chỉ là câu chuyện du hành không gian đơn thuần, mà là một công trình triết học sắc lạnh về bản chất của sự sống và xã hội học vũ trụ.

#### Hai Tiền Đề Tiên Đề Cốt Lõi:
1. **Sự sinh tồn là nhu cầu cơ bản hàng đầu của nền văn minh.**
2. **Nền văn minh không ngừng sinh sôi và mở rộng, nhưng tổng vật chất trong vũ trụ vẫn giữ nguyên.**

Từ hai tiên đề này, Lưu Từ Hân đưa ra hai khái niệm rợn ngợp:
- **Dây chuyền nghi kỵ (Chain of Suspicion)**: Hai nền văn minh cách nhau hàng năm ánh sáng không bao giờ có thể xác định được thiện chí của đối phương.
- **Vụ nổ công nghệ (Technological Explosion)**: Một nền văn minh chậm tiến có thể bất thình lình đột phá công nghệ chỉ trong vài thế kỷ, trở thành hiểm họa khôn lường cho nền văn minh tiên tiến.

Mỗi lần đọc lại cuốn sách này, tôi lại thấy nó tương đồng đến kỳ lạ với sự cạnh tranh khốc liệt trong ngành Trí tuệ Nhân tạo đương đại: Cuộc đua AGI chính là một chuỗi nghi kỵ giữa các cường quốc công nghệ.`,
        en: `> "The universe is a dark forest. Every civilization is an armed hunter stalking through the trees like a ghost..."

*The Three-Body Problem* trilogy presents a chilling axiomatic derivation of cosmic sociology based on survival instincts and resource scarcity.`
      }
    },
    {
      id: "music-ambient-focus-lofi-curation",
      title: {
        vi: "Không gian Âm nhạc Ambient & Neo-Classical giúp Đi sâu vào Trạng thái Flow",
        en: "Ambient & Neo-Classical Soundscapes for Deep Cognitive Flow"
      },
      date: "2026-03-10",
      category: "interests",
      subcategory: "music",
      growthStage: "budding",
      summary: {
        vi: "Tuyển tập những bản nhạc của Brian Eno, Max Richter, Nils Frahm và các âm thanh đồng điệu giúp tĩnh tâm, viết code và giải toán suốt đêm.",
        en: "A curated listening journal featuring Brian Eno, Max Richter, and Nils Frahm for night coding sessions and deep focus."
      },
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
      tags: ["Music", "Ambient", "Flow State", "Soundtrack"],
      readTime: "5 min",
      content: {
        vi: `### Tại sao Não bộ Cần Tần số Thấp khi Tư duy Sâu?

Âm nhạc có lời thường chiếm dụng bộ nhớ làm việc (Phonological Loop) của não bộ, làm gián đoạn chuỗi suy nghĩ logic. Ngược lại, thể loại **Ambient** và **Neo-Classical** xây dựng nên một bức tường cách âm vô hình trước những xao nhãng của thế giới bên ngoài.

#### Danh sách Đề cử Yêu thích Nhất:
1. **Max Richter - *On the Nature of Daylight***: Một bản giao hưởng dây da diết, biến mọi dòng mã trở thành một tác phẩm nghệ thuật.
2. **Nils Frahm - *Says***: Bắt đầu từ những nốt synthesizer đơn giản, lớp lang đan xen dần dần đưa bạn vào trạng thái thôi miên sáng tạo.
3. **Brian Eno - *Music for Airports***: Định nghĩa kinh điển của thể loại ambient: "Có thể lắng nghe thật chăm chú hoặc hoàn toàn phớt lờ."

*Hãy thử đeo tai nghe chống ồn, bật một tách trà ấm và mở danh sách này khi bước vào một bài toán khó.*`,
        en: `### The Neuroscience of Ambient Flow

Lyrical music occupies the brain's phonological loop, distracting logical processing. Ambient and neo-classical music insulate the mind from extraneous cognitive load.`
      }
    },
    {
      id: "game-design-chronicles-of-aetheria",
      title: {
        vi: "Ý tưởng Thiết kế Game: 'Sử Thi Aetheria' — Game Nhập vai Sinh thái và Cơ học Thời gian",
        en: "Game Design Concept: 'Chronicles of Aetheria' — Ecological Time-Loop RPG"
      },
      date: "2026-03-01",
      category: "interests",
      subcategory: "game_ideas",
      growthStage: "seedling",
      summary: {
        vi: "Ý tưởng thiết kế game phiêu lưu thế giới mở nơi mọi hành động tương tác với cây cỏ và sinh vật sẽ làm thay đổi khí hậu và tương lai qua chu kỳ thời gian 300 năm.",
        en: "A game design document for an open-world ecological time-loop RPG where organic interactions reshape climates across a 300-year cycle."
      },
      coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      tags: ["Game Design", "Pixel Art", "Worldbuilding", "Mechanics"],
      readTime: "9 min",
      content: {
        vi: `### Tổng quan Dự án & Triết lý Thiết kế

*Sử Thi Aetheria* không phải là trò chơi chiến đấu tiêu diệt quái vật thông thường. Trò chơi lấy cảm hứng từ cảm giác phiêu lưu của *Outer Wilds* và nét thẩm mỹ thơ mộng của *Studio Ghibli*.

#### Cơ chế Cốt lõi: Hệ Thống Cân Bằng Sinh Thái (Eco-Resonance)

Thế giới trong game hoạt động theo nguyên lý mạng lưới động vật - thực vật tương hỗ:

$$\\frac{dE}{dt} = \\alpha P(t) - \\beta C(t) \\pm \\gamma \\Delta_{\\text{Player}}$$

- **Du hành Thời gian 3 Điểm mốc**:
  1. *Thời Cổ sơ (Năm 0)*: Thiên nhiên nguyên thủy, các di tích cổ xưa vẫn còn nguyên vẹn.
  2. *Thời Kỳ Băng Giá (Năm 150)*: Kỷ băng hà do mất cân bằng nhiệt, các con sông hóa đá mở ra lối đi mới.
  3. *Thời Kỳ Tái Sinh (Năm 300)*: Hậu quả hoặc phần thưởng từ những việc bạn đã làm ở 300 năm trước.

#### Hệ thống Câu đố Thực vật học:
Người chơi không dùng kiếm mà sử dụng **Gậy Gieo Mầm (Spore Staff)** để lai tạo các giống thực vật phát sáng, làm tan chảy băng vĩnh cửu hoặc tạo lối leo trèo trên vách đá thẳng đứng.`,
        en: `### Project Vision & Aesthetic

*Chronicles of Aetheria* is an ecological narrative adventure inspired by *Outer Wilds* and the gentle environmentalism of Studio Ghibli.

Players do not wield weapons to slay beasts; instead, they carry a **Spore Staff** to cultivate bio-luminescent flora, redirect geothermal currents, and witness ecological domino effects across a 300-year temporal loop.`
      }
    },
    {
      id: "curated-video-documentaries",
      title: {
        vi: "Những Thước Phim Tài Liệu Thay Đổi Nhãn Quan về Tự Nhiên và Công Nghệ",
        en: "Cinematic Documentaries that Reshaped My Perspective on Nature and Tech"
      },
      date: "2026-02-14",
      category: "interests",
      subcategory: "video",
      growthStage: "budding",
      summary: {
        vi: "Ghi chép về những bộ phim tài liệu điện ảnh mẫu mực như 'AlphaGo', 'Fantastic Fungi' và 'Our Planet' với chiều sâu thị giác và triết lý sống.",
        en: "Notes and visual analysis of monumental documentaries including 'AlphaGo', 'Fantastic Fungi', and 'Our Planet'."
      },
      coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
      tags: ["Cinema", "Documentary", "Visual Arts", "Philosophy"],
      videoUrl: "https://www.youtube.com/watch?v=WXuK6gekU1Y",
      readTime: "6 min",
      content: {
        vi: `### Điện ảnh như Một Lăng kính Triết học

Những bộ phim tài liệu xuất sắc không truyền đạt thông tin như sách giáo khoa; chúng lay động cảm xúc và thôi thúc người xem nhìn ngắm vũ trụ bằng một cặp mắt hoàn toàn mới.

#### 1. *AlphaGo (2017)*
Khoảnh khắc Nước đi 37 (Move 37) của AlphaGo và Nước đi 78 (Thần chi nhất thủ - The Divine Move) của Lee Sedol là đỉnh cao của sự giao thoa giữa trực giác nhân loại và sự lạnh lùng của thuật toán Monte Carlo Tree Search. Đó không phải là thất bại của con người, mà là một khúc ca tôn vinh trí tuệ.

#### 2. *Fantastic Fungi (2019)*
Mạng lưới sợi nấm (Mycelium) dưới lòng đất chính là "Internet của Trái Đất", liên kết cây cối trong rừng để chia sẻ dinh dưỡng và thông tin cảnh báo sâu bệnh. Một mô hình phân tán phi tập trung hoàn hảo tự nhiên đã sáng tạo từ hàng triệu năm trước.`,
        en: `### Cinema as an Epistemological Lens

Exceptional documentaries do not merely instruct; they re-sensitize our vision to underlying systems of reality. *AlphaGo* captures the haunting beauty of Move 37 against Lee Sedol, while *Fantastic Fungi* showcases the subterranean mycelial internet that inspired distributed network topologies.`
      }
    },
    {
      id: "blog-digital-gardening-manifesto",
      title: {
        vi: "Tuyên ngôn Khu Vườn Số: Từ Tiêu thụ Tin tức Nhanh đến Nuôi dưỡng Tư duy Bền vững",
        en: "The Digital Garden Manifesto: Moving from Stream Consumption to Idea Cultivation"
      },
      date: "2026-01-20",
      category: "interests",
      subcategory: "blog",
      growthStage: "evergreen",
      summary: {
        vi: "Tại sao chúng ta nên từ bỏ các dòng thời gian mạng xã hội hối hả để xây dựng một khu vườn tri thức mở, nơi các ý tưởng được lớn lên từng ngày.",
        en: "Why we should abandon frantic social feeds in favor of an open intellectual garden where ideas mature over years."
      },
      coverImage: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80",
      tags: ["Digital Garden", "PKM", "Writing", "Minimalism"],
      readTime: "6 min",
      content: {
        vi: `### Sự Khác Biệt Giữa 'Dòng Chảy' (Stream) và 'Khu Vườn' (Garden)

Mạng xã hội truyền thống (Facebook, X, TikTok) vận hành theo cơ chế **Dòng Chảy (Stream)**:
- Bài viết có giá trị theo thời gian thực; sau 48 giờ nó rơi vào quên lãng.
- Tôn sùng sự giật gân, những phát biểu ngắn gọn chưa qua kiểm chứng.
- Khuyến khích người xem tiêu thụ thụ động hơn là suy tư thấu đáo.

Ngược lại, **Khu Vườn Số (Digital Garden)** tôn vinh:
- **Sự Bất Toàn & Quá Trình Phát Triển**: Bạn không cần đợi bài viết hoàn hảo 100% mới xuất bản. Một hạt mầm 🌱 có thể lớn lên thành chồi non 🌿 và cây cổ thụ 🌲 sau nhiều năm bổ sung.
- **Tính Phi Tuyến Tính (Topology)**: Các ghi chú liên kết với nhau qua các liên kết mạng nhện (Hyperlinks) thay vì chỉ xếp theo dòng thời gian đơn điệu.
- **Tính Sở Hữu Tự Chủ**: Bạn là chủ nhân mảnh đất số của mình, tự do thiết kế trải nghiệm đọc mà không bị thuật toán câu view chi phối.`,
        en: `### Streams vs. Gardens

Chronological social streams treat thoughts as disposable ephemera. Digital gardens treat thinking as horticultural practice: imperfect seedlings 🌱 grow into budding notes 🌿 and mature into evergreen trees 🌲 through slow, deliberate cultivation.`
      }
    }
  ]
};
