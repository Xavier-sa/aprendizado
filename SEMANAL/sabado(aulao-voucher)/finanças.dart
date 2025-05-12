import 'package:flutter/material.dart';

void main() {
  runApp(FinanceApp());
}

class FinanceApp extends StatelessWidget {
  const FinanceApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: FinanceHome(),
    );
  }
}

class FinanceHome extends StatefulWidget {
  const FinanceHome({super.key});

  @override
  State<FinanceHome> createState() => _FinanceHomeState();
}

class _FinanceHomeState extends State<FinanceHome> {
  double totalGasto = 0.0;
  final TextEditingController _controller = TextEditingController();

  void adicionarGasto() {
    if (_controller.text.isNotEmpty) {
      setState(() {
        totalGasto += double.tryParse(_controller.text) ?? 0.0;
        _controller.clear();
      });
    }
  }

  void removerGasto() {
    if (_controller.text.isNotEmpty) {
      setState(() {
        totalGasto -= double.tryParse(_controller.text) ?? 0.0;
        if (totalGasto < 0) totalGasto = 0.0;
        _controller.clear();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue.shade50,
      appBar: AppBar(
        title: Text(
          "Controle da Bulma 💰",
          style: TextStyle(color: Colors.white, fontFamily: 'Roboto'),
        ),
        backgroundColor: Colors.purple.shade400,
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.account_balance_wallet_rounded,
                size: 80, color: Colors.purple.shade300),
            SizedBox(height: 20),
            Text(
              "Total Gasto",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.w500),
            ),
            Text(
              "R\$ ${totalGasto.toStringAsFixed(2)}",
              style: TextStyle(fontSize: 40, color: Colors.purple.shade800),
            ),
            SizedBox(height: 30),
            TextField(
              controller: _controller,
              keyboardType: TextInputType.numberWithOptions(decimal: true),
              decoration: InputDecoration(
                labelText: "Digite o valor",
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.money),
              ),
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                ElevatedButton.icon(
                  onPressed: adicionarGasto,
                  icon: Icon(Icons.add),
                  label: Text("Adicionar"),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.purple.shade300,
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: removerGasto,
                  icon: Icon(Icons.remove),
                  label: Text("Remover"),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red.shade300,
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}