import turtle

def desenhar_logo():
   
    t = turtle.Turtle()
    t.speed(10)  
    t.penup()
    t.goto(-200, 100)  
    t.pendown()

   
    logo_text = """
                _________________________________________________________________ 
                                                                                        
                \*\  /*/      /*\    \*\    /*/    |*|    |*|====*/    |*|***|*|          
                 \*\/*/      / ^ \    \*\  /*/     |*|    |*|__        |*|_*/*/        
                 /*/\*\     /* - *\    \*\/*/      |*|    |*|--        |*| \*\          
                /*/  \*\   /*/   \*\    \**/       |*|    |*|====*/    |*|  \*\         
                _________________________________________________________________                                                                 
                                
                Protitipo:  'Sistema Conveniência'


                Portifolio: 'https://xavierdev.pages.dev'
                            
                                    
                Sugestões:
            """
    
   
    t.write(logo_text, align="left", font=("Courier", 8, "normal"))

   
    t.penup()
    t.goto(0, -100)
    t.pendown()

 
    colors = ['red', 'orange', 'yellow', 'green', 'purple']
    for i in range(100):
        t.pencolor(colors[i % len(colors)])
        t.width(i / 100 + 40)
        t.forward(i)
        t.left(59)

    
    turtle.done()


desenhar_logo()