export class Champ {
    constructor(title, type, setData, id, value) {
        this.title = title;
        this.type = type;
        this.setData = setData;
        this.id = id;
        this.value = value;
    }
}

class FeatureFormat{
  constructor(name,href,imageSrc,imageAlt){
    this.name = name;
    this.href = href;
    this.imageSrc = imageSrc;
    this.imageAlt = imageAlt;
  }
}
export const featured = [
    [
      new FeatureFormat(
        "Un article",
        "#",
        "https://images.unsplash.com/photo-1602837385569-08ac19ec83af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZ2l0ZWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "Models sitting back to back, wearing Basic Tee in black and bone.",
      ),
      {
        name: "Un article",
        href: "#",
        imageSrc:
          "https://images.unsplash.com/photo-1602837385569-08ac19ec83af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZ2l0ZWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        imageAlt:
          "Models sitting back to back, wearing Basic Tee in black and bone.",
      },
      {
        name: "Un autre article",
        href: "#",
        imageSrc:
          "https://images.unsplash.com/photo-1562408590-e32931084e23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3Ryb25pY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        imageAlt:
          "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
      },
    ],
  
    [
      {
        name: "Un article",
        href: "#",
        imageSrc:
          "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXIlMjBoYXJkd2FyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        imageAlt:
          "Models sitting back to back, wearing Basic Tee in black and bone.",
      },
      {
        name: "Un autre article",
        href: "#",
        imageSrc:
          "https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
        imageAlt:
          "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
      },
    ],
  
  
  [
      {
        name: "Un article",
        href: "#",
        imageSrc:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        imageAlt:
          "Drawstring top with elastic loop closure and textured interior padding.",
      },
      {
        name: "Un autre article",
        href: "#",
        imageSrc:
          "https://images.unsplash.com/photo-1579206630023-fe8d0520ba2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        imageAlt:
          "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
      },
    ],        
  
  
  [
      {
        name: "Un article",
        href: "#",
        imageSrc:
          "https://images.unsplash.com/photo-1588473158757-afdb399558d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        imageAlt:
          "Drawstring top with elastic loop closure and textured interior padding.",
      },
      {
        name: "Un autre article",
        href: "#",
        imageSrc:
          "https://images.unsplash.com/photo-1611572840901-43b748ac2e3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29uZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        imageAlt:
          "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
      },
    ],
  ];