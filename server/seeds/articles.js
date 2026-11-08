
const articles = [
    {
        title: "Your First Trimester: What to Expect",
        content: `The first trimester is the beginning of an incredible journey. During these first twelve weeks, your body starts adapting to pregnancy while your baby develops at an amazing pace.
You may experience symptoms such as tiredness, nausea, breast tenderness, mood changes, or a greater need for sleep. Every pregnancy is different, and some women experience very few symptoms.

This is a good time to arrange your first prenatal appointments, discuss any medications with your healthcare professional, and start taking recommended prenatal vitamins, including folic acid.

Remember to be patient with yourself. Rest when you need it, eat balanced meals when possible, stay hydrated, and allow yourself time to adjust to all the changes.

Pregnancy is not a competition. Your experience is unique, and you do not have to feel a certain way every day.`,
        picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8K1KLTxc7xXwA6H8C7cDyOxWMyqwgIAojMj2r9ONhieTQVSPWnIpbRbs&s=10",
        category: "Pregnancy",
    },
    {
        title: "Preparing Your Hospital Bag: The Essentials",
        content: `As your due date approaches, preparing your hospital bag can help you feel more relaxed and organized. Many parents prefer to pack it a few weeks before the expected arrival of their baby.

For yourself, consider comfortable nightwear, slippers, toiletries, nursing bras, maternity pads, comfortable underwear, and a going-home outfit. Pack your phone charger and any personal items that help you feel at home.

For your baby, prepare a few bodysuits, sleepsuits, socks, a hat, a blanket, nappies, and an outfit for the journey home. Remember to arrange an appropriate infant car seat if you will be travelling by car.

Do not forget important documents, such as your maternity records, identification, and any paperwork requested by your hospital.

Hospital policies and recommendations can vary, so check your maternity unit's guidance before packing. A little preparation can make those first moments together feel less stressful.`,
        picture: "https://ak6q4dz7dpviqmln.public.blob.vercel-storage.com/depositphotos-204533206-s.webp",
        category: "Hospital",
    },
    {
        title: "Understanding Your Newborn's First Weeks",
        content: `The first weeks with a newborn are filled with new experiences, questions, and unforgettable moments. During this time, you and your baby are learning about each other and gradually finding a rhythm.

Newborns usually sleep for several short periods throughout the day and night. They also need frequent feeding, cuddles, and comfort. It is completely normal for daily routines to feel unpredictable at first.

You can support your baby's development through gentle interaction, talking, singing, skin-to-skin contact, and responding to their needs. Even simple everyday moments help build a strong emotional connection.

Try not to compare your baby with others. Every child develops at their own pace. If you have concerns about feeding, sleep, weight gain, or development, speak with your pediatrician or healthcare professional.

And remember: taking care of yourself is also part of taking care of your baby. Accept help when it is offered and give yourself time to adjust to parenthood.`,
        picture: "https://images.ctfassets.net/6m9bd13t776q/xaP2TuBuxgkbeyeZhJhwn/2567490d72708f0a36011a80d5b2ac90/BWBW-week-1-1143761.png?fm=webp&q=75&w=780",
        category: "Baby",
    },
    {
        title: "Building a Gentle Daily Routine with Your Baby",
        content: `Life with a baby can feel unpredictable, especially during the first months. A gentle daily routine can help create a sense of familiarity without putting unnecessary pressure on you or your little one.

Start by observing your baby's natural patterns. Notice when they usually wake up, show signs of hunger, become tired, or enjoy playing. These observations can help you organize the day around their needs.

Simple activities such as feeding, changing, cuddling, reading a short book, and going for a walk can become familiar parts of your day. You do not need a strict schedule. Flexibility is important because babies change quickly as they grow.

Try to include small moments for yourself, too. A quiet cup of tea, a short walk, or a few minutes of rest can make a difference.

The goal is not to create a perfect routine. It is to find a rhythm that works for your family and makes everyday life a little easier.`,
        picture: "https://cdn.shopify.com/s/files/1/0708/2259/2731/files/ADB010007_1-baby-organic-muslin-dream-blanket-safari-dreams_uncropped_1.webp?v=1732829922",
        category: "Parenting Tips",
    },
    {
        title: "Taking Care of Yourself During Pregnancy",
        content: `Pregnancy brings many physical and emotional changes, making self-care especially important. Looking after your wellbeing does not have to involve complicated routines or expensive products.

Try to eat a varied and balanced diet, drink enough water, and get regular rest. Gentle physical activity, such as walking or pregnancy-safe exercise, may also support your wellbeing when approved by your healthcare professional.

Emotional health matters just as much as physical health. It is normal to experience different feelings throughout pregnancy. Talking with your partner, friends, family, or a healthcare professional can help you feel supported.

Make time for activities that help you relax. This could be reading, listening to music, enjoying a warm shower, or simply taking a few quiet moments for yourself.

If you experience persistent sadness, anxiety, or feel overwhelmed, do not hesitate to seek professional support. You deserve care and understanding throughout this journey.`,
        picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfy31xAczGpgLWXdDn2NUv-nLlupHwGjtlvi4T0p003DQqrQSKE3bCmvA&s=10",
        category: "Health and Wellness",
    },
    {
        title: "Getting Your Home Ready for the Baby",
        content: `Preparing your home for a new baby can be exciting, but it is easy to feel overwhelmed by the number of products and recommendations available. The best approach is to focus on practical essentials first.

Start with a safe sleeping space, suitable clothing, nappies, feeding supplies, and basic baby-care products. You do not need to buy everything at once. Many items can be added later as you discover what works best for your family.

Think about organizing a small changing area and keeping everyday essentials within easy reach. Washing baby clothes and preparing a few meals in advance can also make the first days at home easier.

Safety should always come first. Follow current safe-sleep recommendations and check that baby equipment meets applicable safety standards.

Most importantly, remember that your baby needs your love, attention, and care far more than a perfectly decorated nursery. A comfortable and practical home is more than enough to begin this new chapter.`,
        picture: "https://squeakycleannj.com/blog/nursery-cleaning-new-baby-nj.webp",
        category: "Preparing for Baby",
    },
    {
        title: "Comfortable and Stylish Maternity Fashion",
        content: `Your body changes throughout pregnancy, and your wardrobe may need to change with it. Dressing comfortably does not mean giving up your personal style. With a few versatile pieces, you can create outfits that feel both practical and beautiful.

Look for soft, breathable fabrics and clothes that allow room for movement. Stretchy leggings, comfortable dresses, oversized shirts, and supportive footwear can become everyday favourites.

Layering is a simple way to make your wardrobe more flexible. A cardigan, light jacket, or open shirt can transform an outfit and help you adapt to changing temperatures.

You may also want to consider maternity basics that can be worn after pregnancy, especially if you plan to breastfeed. Choose pieces that suit your lifestyle rather than buying items you will only wear once.

Most importantly, wear what makes you feel comfortable and confident. There is no single way to dress during pregnancy. Your style can evolve with you.`,
        picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYBivOBLgHuIrK1-iqz04IZDWU6sn85yuiv2LOseuHA&s=10",
        category: "Maternity Fashion and Style",
    },
];

module.exports = articles;
