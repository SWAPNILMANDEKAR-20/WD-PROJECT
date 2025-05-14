from flask import Flask, render_template, request

app = Flask(__name__)

def calculate_tax(income, regime='old'):
    slabs = {
        'old': [(250000, 0), (500000, 0.05), (1000000, 0.2), (float('inf'), 0.3)],
        'new': [(250000, 0), (500000, 0.05), (750000, 0.1), (1000000, 0.15),
                (1250000, 0.2), (1500000, 0.25), (float('inf'), 0.3)]
    }
    
    tax = 0
    remaining = income
    for i in range(len(slabs[regime])-1):
        current, rate = slabs[regime][i]
        next_val = slabs[regime][i+1][0]
        taxable = min(remaining, next_val - current)
        tax += taxable * rate
        remaining -= taxable
        if remaining <= 0: 
            break
    total_tax = tax * 1.04  # Add 4% cess
    return round(total_tax, 2)

@app.route('/', methods=['GET', 'POST'])
def home():
    result = None
    if request.method == 'POST':
        income = float(request.form['income'])
        old_tax = calculate_tax(income, 'old')
        new_tax = calculate_tax(income, 'new')
        savings = abs(old_tax - new_tax)
        
        recommendation = "New Regime" if new_tax < old_tax else "Old Regime"
        if new_tax == old_tax:
            recommendation = "Both regimes are equal"
        
        result = {
            'old': old_tax,
            'new': new_tax,
            'recommendation': recommendation,
            'savings': savings if new_tax != old_tax else None
        }
    return render_template('index.html', result=result)

@app.route('/tax-calculator', methods=['GET', 'POST'])
def tax_calculator():
    result = None
    if request.method == 'POST':
        income = float(request.form['income'])
        old_tax = calculate_tax(income, 'old')
        new_tax = calculate_tax(income, 'new')
        savings = abs(old_tax - new_tax)
        
        recommendation = "New Regime" if new_tax < old_tax else "Old Regime"
        if new_tax == old_tax:
            recommendation = "Both regimes are equal"
        
        result = {
            'old': old_tax,
            'new': new_tax,
            'recommendation': recommendation,
            'savings': savings if new_tax != old_tax else None
        }
    return render_template('index.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)